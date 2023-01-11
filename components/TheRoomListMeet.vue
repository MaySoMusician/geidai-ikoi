<template>
  <transition
    name="fade"
    mode="out-in"
    @after-enter="
      () => {
        pending || $emit('loaded')
      }
    "
  >
    <CFlex v-if="pending" v-bind="$attrs" key="loading" justify="center">
      <AppSpinnerLoading />
    </CFlex>
    <CFlex v-else-if="error" key="error" justify="center" v-bind="$attrs">
      <AppErrorLoading />
    </CFlex>
    <template v-else>
      <CSimpleGrid
        key="shown"
        :columns="{ base: 1, sm: 2 }"
        :p="{ base: '0 5%', sm: '0 5%' }"
        row-gap="1rem"
        :column-gap="{ base: '5%', sm: '5%' }"
        :mt="10"
      >
        <CFlex
          v-for="(link, index) in meetLinksAvailable"
          :key="index"
          justify="stretch"
          align="center"
        >
          <CTooltip
            v-if="link.isUnavailable"
            has-arrow
            :label="`${link.name}は現在工事中です`"
            placement="top"
            bg="red.500"
          >
            <CButton
              d="flex"
              flex-direction="row"
              width="100%"
              background-color="azalea"
              color="mineShaft"
              :_active="{}"
              :_hover="{}"
              :_focus="{
                outline: 'none',
                boxShadow: '0 0 0 1px rgb(66 153 225 / 60%)',
              }"
              h="auto"
              :py="3"
              opacity="0.5"
            >
              <CIcon name="google-hangouts" size="3rem" :mr="1" />
              <CFlex direction="column" place-items="flex-start">
                <CBox font-size="1.2rem">{{
                  link.name || `Meet ${index + 1}`
                }}</CBox>
                <CBox
                  font-weight="normal"
                  font-size="0.8rem"
                  font-family="mono"
                  mt="0.2rem"
                  pl="0.0625rem"
                  min-width="7.5em"
                  text-align="start"
                  >unavailable</CBox
                >
              </CFlex>
            </CButton>
          </CTooltip>
          <CButton
            v-else
            d="flex"
            flex-direction="row"
            width="100%"
            background-color="azalea"
            color="mineShaft"
            :_active="{ opacity: 0.9 }"
            :_hover="{ opacity: 0.8 }"
            h="auto"
            :py="3"
            @click="logMeetLinkClickEvent(index)"
          >
            <CIcon name="google-hangouts" size="3rem" :mr="1" />
            <CFlex direction="column" place-items="flex-start">
              <CBox font-size="1.2rem">{{
                link.name || `Meet ${index + 1}`
              }}</CBox>
              <CBox
                font-weight="normal"
                font-size="0.8rem"
                font-family="mono"
                mt="0.2rem"
                pl="0.0625rem"
                >{{ getMeetId(link.url) }}</CBox
              >
            </CFlex>
          </CButton>
        </CFlex>
      </CSimpleGrid>
    </template>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  fetchNotionTableData,
  isValidMeetLinkItem,
  MeetLinkItem,
} from '@/utils/notion'

type Data = {
  meetLinks: MeetLinkItem[]
  pending: boolean
  error: Error | null
}

type Computed = {
  email: string
  studentId: string
  welcomeMessage: string
  meetLinksAvailable: MeetLinkItem[]
}

type Methods = {
  showToast(): void
  getMeetId(url: string): string
  logMeetLinkClickEvent(index: number): void
  load(): void
}

type Props = {
  autoLoad: boolean
}

const vue = Vue.extend<Data, Methods, Computed, Props>({
  props: {
    autoLoad: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      meetLinks: [],
      pending: true,
      error: null,
    }
  },
  computed: {
    email() {
      return this.$accessor.user?.email || 'NO EMAIL'
    },
    studentId() {
      return this.email.replace(/@.*.geidai.ac.jp/, '')
    },
    welcomeMessage() {
      return `${this.studentId}さん、こんにちは`
    },
    meetLinksAvailable() {
      return this.meetLinks.filter((link) => !link.isHidden)
    },
  },
  mounted() {
    if (this.autoLoad) this.load()
  },
  methods: {
    showToast() {},
    getMeetId(url) {
      return url.replace('https://meet.google.com/', '')
    },
    logMeetLinkClickEvent(index) {
      const { slug, url } = this.meetLinksAvailable[index]
      this.$gtag.event('enter_room', {
        room_type: 'Google Meet',
        room_slug: slug,
      })
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    async load() {
      try {
        const rawItems = await fetchNotionTableData(
          this.$config.meetLinksDatabaseId
        ).then((r) => r.json())
        console.log(rawItems)
        if (Array.isArray(rawItems)) {
          const items = rawItems.filter((v) => isValidMeetLinkItem(v))
          this.meetLinks = items
        }
      } catch (e) {
        this.error = e
      } finally {
        this.pending = false
      }
    },
  },
})
export default vue
export type TheRoomListMeetType = typeof vue
</script>

<style lang="scss" scoped>
@include fadeEaseOutCubic('fade', $globalFadeDuration, 0s);
</style>

<style lang="scss" module>
.Heading {
  font-size: 1.125rem;
  font-weight: bold;
  min-width: 7em;

  margin: {
    left: auto;
    right: auto;
  }

  padding: {
    top: 0.8rem;
    bottom: 0.8rem;
  }

  @include headingBorderAboveBelow();
}
</style>
