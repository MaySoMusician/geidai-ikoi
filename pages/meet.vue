<template>
  <div>
    <TheWebsiteTitle />
    <TheNewsList
      mx="auto"
      :mb="3"
      max-w="42rem"
      align="stretch"
      @loaded="newsLoaded = true"
    />
    <CText font-size="1.4rem" font-weight="bold" text-align="center">{{
      welcomeMessage
    }}</CText>
    <transition name="fade" mode="out-in" @after-enter="() => {}">
      <template v-if="newsLoaded">
        <CFlex v-if="$fetchState.pending" key="loading" justify="center">
          <AppSpinnerLoading />
        </CFlex>
        <div v-else-if="$fetchState.error" key="error">error</div>
        <CSimpleGrid
          v-else
          key="shown"
          :columns="{ base: 1, sm: 2 }"
          :spacing="4"
          :mt="5"
        >
          <CFlex
            v-for="(link, index) in meetLinksAvailable"
            :key="index"
            justify="stretch"
            align="center"
            :p="{
              base: '0 10% 0 10%',
              sm: index % 2 === 0 ? '0 2% 0 15%' : '0 15% 0 2%',
            }"
          >
            <CButton
              as="a"
              d="flex"
              flex-direction="row"
              width="100%"
              variant-color="blue"
              h="auto"
              :py="3"
              :href="link.url"
              target="_blank"
              rel="noopener noreferer"
            >
              <CIcon name="google-hangouts" size="3rem" :mr="1" />
              <CFlex direction="column">
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
    <CFlex justify="center" direction="column" align="center">
      <CButton variant-color="gray" :mt="8" @click="signOut">
        <CIcon name="chevron-left" size="2rem" :ml="-3" :mr="0" />ログアウト
      </CButton>
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
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  inject: ['$chakraColorMode', '$toggleColorMode'],
  middleware: ['auth'],
  data() {
    return {
      meetLinks: [],
      newsLoaded: false,
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
    },
    getMeetId(url) {
      return url.replace('https://meet.google.com/', '')
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter {
  transform: translateY(0.3rem);
}
</style>

<style lang="scss" module></style>
