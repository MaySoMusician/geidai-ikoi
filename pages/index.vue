<template>
  <div>
    <TheWebsiteTitle />
    <DR1TheNewsList
      mx="auto"
      :mb="3"
      max-w="42rem"
      align="stretch"
      @loaded="newsLoaded = true"
    />

    <transition name="fade" mode="out-in" @after-enter="() => {}">
      <div v-if="newsLoaded">
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
          <CButton
            as="nuxt-link"
            variant-color="gray"
            font-weight="normal"
            font-size="xl"
            mt="5rem"
            to="/about/"
          >
            このサイトについて
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
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type firebase from 'firebase'

import { ChakraTheme, ToggleColorModeFunction } from '@/types/chakra-ui-bridge'
import { debugLog, debugError } from '@/utils/debug'

type Data = {
  showModal: boolean
  newsLoaded: boolean
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
  getForwardLinkAfterSignIn(): string
}

function _initializeGoogleAuthProvider(authModule: typeof firebase.auth) {
  const provider = new authModule.GoogleAuthProvider()
  provider.addScope('email')
  return provider
}

const appMeetUrl = '/meet/'

async function _signIn(self: InstanceType<typeof vue>, { hd }: { hd: string }) {
  const provider = _initializeGoogleAuthProvider(self.$fireModule.auth)
  provider.setCustomParameters({ prompt: 'consent', hd })
  self.$fire.auth.useDeviceLanguage()

  try {
    await (self.$device.isDesktop
      ? self.$fire.auth.signInWithPopup(provider)
      : self.$fire.auth.signInWithRedirect(provider))
  } catch (e) {
    debugError(e)
  }
}

function setUserDepartment(
  self: InstanceType<typeof vue>,
  user: firebase.User
) {
  if (!user.email?.endsWith('.geidai.ac.jp')) return

  const department = /[^@]*@(.*).geidai.ac.jp/.exec(
    user.email.toLowerCase()
  )?.[1]

  if (!department) return

  // @ts-ignore
  self.$gtag.query('set', 'user_properties', { user_department: department })
}

const vue = Vue.extend<Data, Methods, Computed, unknown>({
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data() {
    return {
      showModal: false,
      newsLoaded: true,
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
          setUserDepartment(this, newUser)
          this.$gtag.event('login', { method: 'Google', login_type: 'desktop' })
          this.$router.push(this.getForwardLinkAfterSignIn())
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
        setUserDepartment(this, user)
        this.$gtag.event('login', { method: 'Google', login_type: 'mobile' })
        await this.$router.push(this.getForwardLinkAfterSignIn())
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
        return this.$router.push(this.getForwardLinkAfterSignIn())
      }

      await _signIn(this, { hd: 'ms.geidai.ac.jp' })
    },
    async othersSignIn() {
      if (this.$accessor.user) {
        debugLog('User already signed in')
        return this.$router.push(this.getForwardLinkAfterSignIn())
      }

      await _signIn(this, { hd: 'fa.geidai.ac.jp' })
    },
    getForwardLinkAfterSignIn() {
      const { forward } = this.$route.query
      return forward ? `/${decodeURIComponent(forward as string)}` : appMeetUrl
    },
  },
})

export default vue
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
