<template>
  <div>
    <TheWebsiteTitle />
    <TheNewsList mb="1.6rem" align="stretch" @loaded="newsLoaded = true" />
    <CText :class="[$style.Heading]">どこで憩う？</CText>

    <transition name="fade1" mode="out-in" @after-enter="meetLinksShown = true">
      <template v-if="newsLoaded">
        <CFlex
          v-if="$fetchState.pending"
          key="loading"
          justify="center"
          :mt="10"
        >
          <AppSpinnerLoading />
        </CFlex>
        <CFlex
          v-else-if="$fetchState.error"
          key="error"
          justify="center"
          :mt="10"
        >
          <AppErrorLoading />
        </CFlex>
        <CSimpleGrid
          v-else
          key="shown"
          :columns="{ base: 1, sm: 2 }"
          :p="{ base: '0 5%', sm: '0 6%' }"
          row-gap="1rem"
          :column-gap="{ base: '5%', sm: '6%' }"
          :mt="10"
        >
          <CFlex
            v-for="(link, index) in meetLinksAvailable"
            :key="index"
            justify="stretch"
            align="center"
          >
            <CButton
              d="flex"
              flex-direction="row"
              width="100%"
              background-color="santafe"
              color="white"
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
    <CFlex justify="center" direction="column" align="center" :pt="10">
      <AppButton text="ログアウト" chevron="left" @click="signOut" />
    </CFlex>

    <CFlex justify="center" direction="column" align="center"> </CFlex>
  </div>
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
  newsLoaded: boolean
  meetLinksShown: boolean
}

type Computed = {
  email: string
  studentId: string
  welcomeMessage: string
  meetLinksAvailable: MeetLinkItem[]
}

type Methods = {
  showToast(): void
  signOut(): void
  getMeetId(url: string): string
  logMeetLinkClickEvent(index: number): void
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  inject: ['$chakraColorMode', '$toggleColorMode'],
  middleware: ['auth'],
  data() {
    return {
      meetLinks: [],
      newsLoaded: false,
      meetLinksShown: false,
    }
  },
  async fetch() {
    const rawMeetLinks = await fetchNotionTableData(
      this.$config.meetLinksDatabaseId
    ).then((r) => r.json())
    if (Array.isArray(rawMeetLinks)) {
      const meetLinks = rawMeetLinks.filter((v) => isValidMeetLinkItem(v))
      this.meetLinks = meetLinks
    }
  },
  head() {
    return {
      title: 'Meet',
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
  methods: {
    showToast() {},
    signOut() {
      this.$fire.auth.signOut()
      this.$router.push('/')
    },
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
  },
})
</script>

<style lang="scss" scoped>
@include fadeEaseOutCubic('fade1', $globalFadeDuration, 0s);
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
