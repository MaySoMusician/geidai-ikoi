<template>
  <div>
    <TheAboveTheFold />
    <TheNewsList align="stretch" @loaded="newsLoaded = true" />

    <CBox as="section" :class="[$style.SectionContainer]">
      <CHeading as="h2">憩いとは</CHeading>
      <CFlex justify="center" align="center" :mt="8">
        <AppButton text="詳しく" />
      </CFlex>
    </CBox>

    <CBox
      as="section"
      :class="[$style.SectionContainer]"
      background-color="grass.50"
    >
      <CHeading as="h2">運営より</CHeading>
      <CGrid :class="[$style.SectionGrid]" :mt="8">
        <AppButton
          v-for="(link, index) in linksToAbout"
          :key="index"
          as="nuxt-link"
          :text="link.text"
          :to="link.to"
        />
      </CGrid>
    </CBox>

    <CBox as="section" :class="[$style.SectionContainer]">
      <CHeading as="h2">ギャラリー</CHeading>
      <CBox :class="[$style.GalleryOuterContainer]">
        <CFlex id="slideshowContainer" :class="[$style.GalleryImageContainer]">
          <CImage
            v-for="(photo, index) in photosDoubled"
            :key="index"
            :src="photo"
            height="12rem"
            mr="0.6rem"
            box-shadow="sm"
            @load="onLoadSlideShowPhotos(index)"
          />
        </CFlex>
      </CBox>
      <CFlex justify="center" align="center" :mt="2">
        <AppButton text="応募する" />
      </CFlex>
    </CBox>

    <div v-if="newsLoaded">
      <!-- <CBox :class="[$style.GalleryContainer]">
        <CHeading as="h2">ギャラリー</CHeading>
        <CFlex :class="[$style.GalleryImageContainer]">
          <CBox
            v-for="i in 3"
            :key="i"
            :class="[$style.GalleryImageItem]"
            box-shadow="md"
            >{{ i }}</CBox
          >
        </CFlex>
      </CBox>
      <CBox :class="[$style.AboutWebsiteContainer]">
        <CHeading as="h2"
          ><span>このサイトに</span><span>ついて</span></CHeading
        >
        <CFlex justify="stretch">
          <CBox>お問い合わせ</CBox>
        </CFlex>
      </CBox> -->
      <!-- <CFlex justify="center" direction="column" align="center">
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
        </CFlex> -->
    </div>

    <transition name="fade" mode="out-in" @after-enter="() => {}"> </transition>
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
  linksToAbout: { text: string; to: string }[]
  photos: string[]
  loadedPhotos: Set<number>
}

type Computed = {
  colorMode: string
  theme: ChakraTheme
  toggleColorMode: ToggleColorModeFunction
  photosDoubled: string[]
}

type Methods = {
  showToast(): void
  signOut(): void
  musicStudentSignIn(): void
  othersSignIn(): void
  getForwardLinkAfterSignIn(): string
  onLoadSlideShowPhotos(index: number): void
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
      newsLoaded: false,
      unwatchUser: null,
      linksToAbout: [
        { text: 'コメント', to: '/about/#' },
        { text: 'お問い合わせ', to: '/about/#' },
        { text: '募集案内', to: '/about/#' },
        { text: '権利表示', to: '/about/#' },
      ],
      photos: [
        'photo-ikoi02.jpg',
        'photo-ikoi03.jpg',
        'photo-cat01.jpg',
        'photo-ikoi04.jpg',
        'photo-ikoi05.jpg',
        'photo-ikoi01.jpg',
      ],
      loadedPhotos: new Set(),
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
    photosDoubled() {
      return this.photos.concat(this.photos)
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
    onLoadSlideShowPhotos(index) {
      this.loadedPhotos.add(index)

      if (this.loadedPhotos.size >= this.photosDoubled.length) {
        this.$nextTick(() => {
          const container = document.querySelector(
            '#slideshowContainer'
          ) as HTMLDivElement
          // Adding 8px is required since the margin-right of the last item is halved
          const width = Math.ceil(container.scrollWidth / 2) + 5
          container.style.setProperty('--slideshowDest', `-${width}px`)
          container.style.setProperty(
            '--slideshowDuration',
            `${width / 0.024}ms`
          )
          container.style.setProperty('animation-play-state', 'running')
        })
      }
    },
  },
})

export default vue
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.33, 1, 0.68, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter {
  transform: translateY(0.3rem);
}
</style>

<style lang="scss" module>
.Section {
  &Container {
    padding: {
      top: 2rem;
      bottom: 3rem;
    }

    h2 {
      text-align: center;
      font-size: 1.125rem;
      width: fit-content;
      min-width: 7em;

      margin: {
        left: auto;
        right: auto;
      }

      padding: {
        top: 0.8rem;
        bottom: 0.8rem;
      }

      border-top: 2px solid var(--theme-colors-santafe);
      border-bottom: 2px solid var(--theme-colors-santafe);
    }
  }

  &Grid {
    grid-row-gap: 1rem;
    grid-template-columns: repeat(2, minmax(10em, auto));
    place-content: space-evenly;

    > button {
      width: 100%;
      margin: {
        left: auto;
        right: auto;
      }
    }
  }
}

.Gallery {
  $top: 2.5rem;

  &OuterContainer {
    position: relative;
    overflow: hidden;

    padding: {
      top: $top; // Overwrite the value of SectionContainer class
    }

    &::before {
      content: '';
      display: block;
      padding-top: 13rem;
    }
  }

  &Image {
    &Container {
      position: absolute;
      top: 1.6rem;
      left: 0;
      flex-wrap: nowrap;
      z-index: 0;

      animation: slideshow infinite linear 0s both;
      animation-play-state: paused;
      animation-duration: var(--slideshowDuration, 0s);
    }
  }
}

/* .Gallery {
  &Container {
    position: relative;

    margin: {
      top: 2rem;
    }

    padding: {
      bottom: 15rem;
    }

    > h2 {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      font-size: 1.8rem;
      writing-mode: vertical-rl;
      height: 5.2em;
    }
  }
} */

@keyframes slideshow {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(var(--slideshowDest, 0px));
  }
}

.AboutWebsite {
  &Container {
    position: relative;
    margin: {
      top: 2rem;
    }

    padding: {
      bottom: calc(calc(1.8rem * 6.2) + 1rem);
    }

    > h2 {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      font-size: 1.8rem;
      writing-mode: vertical-rl;
      height: 6.2em;

      > span {
        white-space: nowrap;
      }
    }
  }
}
</style>
