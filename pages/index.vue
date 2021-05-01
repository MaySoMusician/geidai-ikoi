<template>
  <div>
    <CHeading
      as="h1"
      text-align="center"
      :mt="3"
      :mb="4"
      :class="[$style.Title]"
    >
      <AppSvgIconCoffee /><span>オンライン憩い</span><AppSvgIconCoffee />
    </CHeading>
    <CStack :spacing="3" mx="auto" :mb="10" max-w="42rem" align="stretch">
      <CAlert v-for="i in 2" :key="i" status="info">
        <CAlertIcon />
        <CBox>
          <CAlertTitle :mr="2">お知らせ</CAlertTitle>
          <CAlertDescription
            >お知らせ文章お知らせ文章お知らせ文章お知らせ文章</CAlertDescription
          >
        </CBox>
      </CAlert>
    </CStack>

    <CHeading as="h2" text-align="center" size="lg" :mt="3" :mb="4">
      ログイン
    </CHeading>
    <CFlex justify="center" direction="column" align="center">
      <CButton
        variant-color="blue"
        font-weight="normal"
        font-size="xl"
        w="14em"
        :mb="3"
        @click="musicStudentSignIn"
      >
        <CIcon name="account" size="2rem" :ml="-1" :mr="2" /><span
          >音楽学部生はこちら</span
        >
      </CButton>
      <CButton
        variant="link"
        variant-color="gray.600"
        font-weight="normal"
        font-size="md"
        @click="othersSignIn"
      >
        美術学部生・その他の学生はこちら
      </CButton>
      <CModal :is-open="showModal">
        <CModalOverlay />
        <CModalContent>
          <CModalHeader>Are you sure?</CModalHeader>
          <CModalBody>Deleting user cannot be undone</CModalBody>
          <CModalFooter>
            <CButton @click="showModal = false"> Cancel </CButton>
            <CButton
              margin-left="3"
              variant-color="red"
              @click="showModal = false"
            >
              Delete User
            </CButton>
          </CModalFooter>
          <CModalCloseButton @click="showModal = false" />
        </CModalContent>
      </CModal>
    </CFlex>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type firebase from 'firebase'

import { ChakraTheme, ToggleColorModeFunction } from '@/types/chakra-ui-bridge'
import { debugLog, debugError } from '@/utils/debug'

type Data = {
  showModal: boolean
  unwatchUser: (() => void) | null
}

type Computed = {
  colorMode: string
  theme: ChakraTheme
  toggleColorMode: ToggleColorModeFunction
}

type Methods = {
  showToast(): void
  signOut(): void
  musicStudentSignIn(): void
  othersSignIn(): void
}

function _initializeGoogleAuthProvider(authModule: typeof firebase.auth) {
  const provider = new authModule.GoogleAuthProvider()
  provider.addScope('email')
  provider.setCustomParameters({
    prompt: 'select_account',
  })
  return provider
}

const appMeetUrl = '/meet'

export default Vue.extend<Data, Methods, Computed, unknown>({
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data() {
    return {
      showModal: false,
      unwatchUser: null,
    }
  },
  computed: {
    colorMode() {
      return this.$chakraColorMode()
    },
    theme() {
      return this.$chakraTheme()
    },
    toggleColorMode() {
      return this.$toggleColorMode
    },
  },
  created() {
    this.unwatchUser = this.$store.watch(
      (_, getters) => getters.user,
      (newUser) => {
        // Redirect to application (for users on computers)
        if (newUser) {
          debugLog('Confirmed an user on computer signed in')
          this.$router.push(appMeetUrl)
        }
      }
    )
  },
  beforeDestroy() {
    if (this.unwatchUser) this.unwatchUser()
  },
  async mounted() {
    try {
      const { user } = await this.$fire.auth.getRedirectResult()
      if (user) {
        // Redirect to application (for users on mobile devices)
        debugLog('Confirmed an user on mobile signed in')
        await this.$router.push(appMeetUrl)
      }
    } catch (e) {
      debugError(e)
    }
  },
  methods: {
    showToast() {
      /* this.$toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 10000,
        isClosable: true,
      }) */
      /* const provider = new this.$fireModule.auth.GoogleAuthProvider()
      provider.addScope('email')
      provider.setCustomParameters({
        hd: 'ms.geidai.ac.jp',
        prompt: 'select_account',
      })
      this.$fire.auth.useDeviceLanguage()
      this.$fire.auth.signInWithPopup(provider).then((userCredential) => {
        debugLog(userCredential)
      }) */
    },
    signOut() {
      this.$fire.auth.signOut()
    },
    async musicStudentSignIn() {
      if (this.$accessor.user) {
        debugLog('User already signed in')
        return this.$router.push(appMeetUrl)
      }

      const provider = _initializeGoogleAuthProvider(this.$fireModule.auth)
      provider.setCustomParameters({
        hd: 'ms.geidai.ac.jp',
      })
      this.$fire.auth.useDeviceLanguage()

      try {
        await (this.$device.isDesktop
          ? this.$fire.auth.signInWithPopup(provider)
          : this.$fire.auth.signInWithRedirect(provider))
      } catch (e) {
        debugError(e)
      }
    },
    async othersSignIn() {
      if (this.$accessor.user) {
        debugLog('User already signed in')
        return this.$router.push(appMeetUrl)
      }

      const provider = _initializeGoogleAuthProvider(this.$fireModule.auth)
      provider.setCustomParameters({
        hd: 'fa.geidai.ac.jp',
      })
      this.$fire.auth.useDeviceLanguage()

      try {
        await (this.$device.isDesktop
          ? this.$fire.auth.signInWithPopup(provider)
          : this.$fire.auth.signInWithRedirect(provider))
      } catch (e) {
        debugError(e)
      }
    },
  },
})
</script>

<style lang="scss" module>
.Title span {
  vertical-align: middle;
  margin: {
    left: 6px;
    right: 6px;
  }
}
</style>
