<template>
  <div style="position: relative">
    <TheAboveTheFold
      @clickMusicStudentSignIn="musicStudentSignIn"
      @clickOthersSignIn="othersSignIn"
      @clickSignOut="signOut"
    />
    <TheNewsList align="stretch" @loaded="newsLoaded = true" />

    <client-only>
      <div ref="AuthRequiredSection" :class="[$style.AuthRequiredSection]">
        <CBox as="section" :class="[]" pt="4rem" pb="3rem">
          <CHeading
            as="h2"
            text-align="center"
            font-size="1.5rem"
            letter-spacing="0.0875rem"
            >どこで憩う？</CHeading
          >
          <TheRoomListMeet ref="RoomListMeet" :auto-load="meetLinkAutoLoad" />
        </CBox>
      </div>
    </client-only>

    <div ref="CommonSection" :class="[$style.CommonSection]">
      <DocSectionWithPicture
        picture-src="/illust-02.png"
        :picture-width="1600"
        :picture-height="1147"
        picture-source="noop/index"
        picture-position="left"
      >
        <AppHeadingTwoLine line1="INTRO" line2="憩いとは" position="left" />
        <CBox :class="[$style.SectionDescription]">
          <CText
            >憩いはこれまで、学生同士で語り合ったり待ち合わせをするときなどに使われ、愛されてきました。</CText
          >
          <CText
            >今でこそ使うことはかないませんが、そこにはたくさんの藝大生の日常が詰まっています。</CText
          >
        </CBox>
        <CFlex justify="center" align="center">
          <AppButton as="nuxt-link" text="詳しく" to="/intro/" />
        </CFlex>
      </DocSectionWithPicture>

      <DocSectionWithPicture
        picture-src="/illust-01.png"
        :picture-width="1600"
        :picture-height="1168"
        picture-source="noop/index"
        picture-position="right"
      >
        <AppHeadingTwoLine line1="ABOUT" line2="運営より" position="left" />
        <CBox :class="[$style.SectionDescription]">
          <CText
            >感染症対策として、「憩い」は封じられてしまっています。しかしながら、ニュー・ノーマルに対応したオンライン憩いでは、ウイルスを気にすることなく心ゆくまで交流が図れます。気軽に入室してみてください。</CText
          >
        </CBox>
        <CGrid :class="[$style.SectionGrid]">
          <AppButton
            v-for="(link, index) in linksToAbout"
            :key="index"
            as="nuxt-link"
            :text="link.text"
            :to="link.to"
          />
        </CGrid>
      </DocSectionWithPicture>

      <CBox as="section" :class="[$style.SectionContainer]">
        <AppHeadingTwoLine
          line1="GALLERY"
          line2="ギャラリー"
          position="center"
        />
        <CBox
          :class="[$style.SectionDescription]"
          max-w="32em"
          text-align="center"
          mx="auto"
        >
          <CText
            >ここはかつての憩いの姿、いまや封じられた藝大の楽園。いつかまたここに集えることを祈りながら……。</CText
          >
          <CText>憩いを愛する皆様からの写真も募集しております。</CText>
        </CBox>
        <CBox :class="[$style.GalleryOuterContainer]">
          <client-only>
            <CFlex
              id="slideshowContainer"
              :class="[$style.GalleryImageContainer]"
            >
              <AppNuxtImgImitatedFixed
                v-for="(photo, index) in photosDoubled"
                :key="index"
                :class="[$style.GalleryImageItem]"
                :original-src="photo.src"
                :original-width="photo.width"
                :original-height="photo.height"
                original-format="jpg"
                :sizes="{ xs: 500 }"
                payload-source="noop/gallery"
                @load="onLoadSlideShowPhotos(index)"
              />
            </CFlex>
          </client-only>
        </CBox>
        <CFlex justify="center" align="center" mt="2rem">
          <AppButton text="応募する" />
        </CFlex>
      </CBox>
    </div>

    <div v-if="newsLoaded"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type firebase from 'firebase'

import { ChakraTheme, ToggleColorModeFunction } from '@/types/chakra-ui-bridge'
import { debugLog, debugError } from '@/utils/debug'
import { TheRoomListMeetType } from '@/components/TheRoomListMeet.vue'
import { applyOrderedStyles } from '@/utils/dom'
import {
  FORBIDDEN_OUTSIDE_OF_UNIV,
  EMAIL_DOMAIN_ALLOWED,
} from '@/utils/constants'

type Photo = { src: string; width: number; height: number }

type Data = {
  showModal: boolean
  newsLoaded: boolean
  linksToAbout: { text: string; to: string }[]
  photos: Photo[]
  loadedPhotos: Set<number>
}

type Computed = {
  colorMode: string
  theme: ChakraTheme
  toggleColorMode: ToggleColorModeFunction
  photosDoubled: Photo[]
  userSignedIn: boolean
  meetLinkAutoLoad: boolean
}

type Methods = {
  showToast(): void
  signOut(): void
  musicStudentSignIn(): void
  othersSignIn(): void
  forwardAfterSignInIfRequired(): false | Promise<unknown>
  onLoadSlideShowPhotos(index: number): void
}

/* -----------------------------------
 * Helper functions for Google Sign-in
 */

function _initializeGoogleAuthProvider(authModule: typeof firebase.auth) {
  const provider = new authModule.GoogleAuthProvider()
  provider.addScope('email')
  return provider
}

// const appMeetUrl = '/meet/'

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

/* ------------------------------------
 * Helper function for Google Analytics
 */

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

/* -------------------------------------------------
 * Fields, helpers, constants for element transition
 */

let _userSignedInFirstLoad = false

function showElementByRefId(self: InstanceType<typeof vue>, id: string) {
  const elem = self.$refs[id] as HTMLElement
  elem.style.display = ''
}

function hideElementByRefId(self: InstanceType<typeof vue>, id: string) {
  const elem = self.$refs[id] as HTMLElement
  elem.style.display = 'none'
}

const REF_AUTH_REQUIRED = 'AuthRequiredSection'
const REF_COMMON = 'CommonSection' // eslint-disable-line @typescript-eslint/no-unused-vars

/* ------------------------
 * Vue component definition
 */

let _unwatchUser: (() => void) | null = null

const vue = Vue.extend<Data, Methods, Computed, unknown>({
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data() {
    // Load meet links automatically if an user signed in.
    _userSignedInFirstLoad = !!this.$accessor.user

    return {
      showModal: false,
      newsLoaded: false,
      unwatchUser: null,
      linksToAbout: [
        { text: 'コメント', to: '/about/#team' },
        { text: 'お問い合わせ', to: '/about/#contacts' },
        { text: '募集案内', to: '/about/#' },
        { text: '権利表示', to: '/about/#attributions' },
      ],
      photos: [
        { src: '/photo-ikoi02.jpg', width: 1568, height: 1044 },
        { src: '/photo-ikoi03.jpg', width: 1568, height: 1044 },
        { src: '/photo-cat01.jpg', width: 1108, height: 1478 },
        { src: '/photo-ikoi04.jpg', width: 1568, height: 1044 },
        { src: '/photo-ikoi05.jpg', width: 1568, height: 1044 },
        { src: '/photo-ikoi01.jpg', width: 1568, height: 1044 },
      ],
      loadedPhotos: new Set(),
    }
  },
  head() {
    return {
      title: '',
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
    userSignedIn() {
      return !!this.$accessor.user
    },
    meetLinkAutoLoad() {
      return _userSignedInFirstLoad
    },
  },
  created() {
    _unwatchUser = this.$store.watch(
      (_, getters) => getters.user,
      (newUser) => {
        // Sign-in status changed (for users on computers)
        if (newUser) {
          // Verify email domain
          if (
            !newUser.email ||
            !newUser.email?.endsWith(EMAIL_DOMAIN_ALLOWED)
          ) {
            return this.$nuxt.error({
              statusCode: 403,
              message: FORBIDDEN_OUTSIDE_OF_UNIV,
            })
          }

          debugLog('Confirmed an user on computer signed in')
          setUserDepartment(this, newUser)
          this.$gtag.event('login', { method: 'Google', login_type: 'desktop' })

          // Quit if 'forward' query exists
          if (this.forwardAfterSignInIfRequired() !== false) return
        }

        const authRequiredSection = this.$refs
          .AuthRequiredSection as HTMLDivElement
        const commonSection = this.$refs.CommonSection as HTMLDivElement
        const clearStyles = () => {
          applyOrderedStyles(authRequiredSection, [
            ['transition', ''],
            ['clipPath', ''],
            ['opacity', ''],
            ['position', ''],
          ])
          applyOrderedStyles(commonSection, [
            ['transition', ''],
            ['transform', ''],
          ])
        }

        if (newUser) {
          // Show AuthRequiredSection
          const commonTopBefore = commonSection.getBoundingClientRect().top

          const showAuthRequired = () => {
            applyOrderedStyles(authRequiredSection, [
              ['clipPath', 'inset(0 0 100% 0)'],
              ['opacity', '0'],
            ])
            showElementByRefId(this, REF_AUTH_REQUIRED)

            const commonTopAfter = commonSection.getBoundingClientRect().top
            const distance = commonTopBefore - commonTopAfter
            applyOrderedStyles(commonSection, [
              ['transform', `translateY(${distance}px)`],
            ])

            setTimeout(() => {
              const duration = 0.5
              const ease = 'cubic-bezier(0.33, 1, 0.68, 1)'

              applyOrderedStyles(authRequiredSection, [
                [
                  'transition',
                  `clip-path ${duration}s ${ease},  opacity ${duration}s ${ease}`,
                ],
                ['clipPath', 'inset(0)'],
                ['opacity', '1'],
              ])
              applyOrderedStyles(commonSection, [
                ['transition', `transform ${duration}s ${ease}`],
                ['transform', 'translateY(0px)'],
              ])

              setTimeout(() => {
                clearStyles()
              }, duration * 1000 + 10)
            }, 10)
          }

          const RoomListMeet = this.$refs
            .RoomListMeet as InstanceType<TheRoomListMeetType>

          if (RoomListMeet.$data.pending) {
            RoomListMeet.$once('loaded', showAuthRequired)
            RoomListMeet.load()
          } else {
            showAuthRequired()
          }
        } else {
          // Hide AuthRequiredSection
          const commonTopBefore = commonSection.getBoundingClientRect().top
          const commonTopAfter = authRequiredSection.getBoundingClientRect().top
          const distance = commonTopBefore - commonTopAfter

          applyOrderedStyles(authRequiredSection, [
            ['position', 'absolute'],
            ['clipPath', 'inset(0)'],
            ['opacity', '1'],
          ])
          applyOrderedStyles(commonSection, [
            ['transform', `translateY(${distance}px)`],
          ])

          setTimeout(() => {
            const duration = 0.5
            const ease = 'cubic-bezier(0.33, 1, 0.68, 1)'

            applyOrderedStyles(authRequiredSection, [
              [
                'transition',
                `clip-path ${duration}s ${ease},  opacity ${duration}s ${ease}`,
              ],
              ['clipPath', 'inset(0 0 100% 0)'],
              ['opacity', '0'],
            ])
            applyOrderedStyles(commonSection, [
              ['transition', `transform ${duration}s ${ease}`],
              ['transform', 'translateY(0px)'],
            ])

            setTimeout(() => {
              clearStyles()
              hideElementByRefId(this, REF_AUTH_REQUIRED)
            }, duration * 1000 + 10)
          }, 10)
        }
      }
    )
  },
  beforeDestroy() {
    _unwatchUser?.()
  },
  async mounted() {
    try {
      // Sign-in status changed (for users on mobile devices)
      const { user } = await this.$fire.auth.getRedirectResult()
      if (user) {
        // Verify email domain
        if (!user.email || !user.email?.endsWith(EMAIL_DOMAIN_ALLOWED)) {
          return this.$nuxt.error({
            statusCode: 403,
            message: FORBIDDEN_OUTSIDE_OF_UNIV,
          })
        }

        debugLog('Confirmed an user on mobile signed in')
        setUserDepartment(this, user)
        this.$gtag.event('login', { method: 'Google', login_type: 'mobile' })

        // Redirect and quit the function if 'forward' query exists
        if ((await this.forwardAfterSignInIfRequired()) !== false) return
      }
    } catch (e) {
      debugError(e)
    }

    // If an user already signed in and opens the page with 'forward' query,
    // forward them to the requested page.
    if (_userSignedInFirstLoad) {
      if (!this.$accessor.user!.email?.endsWith(EMAIL_DOMAIN_ALLOWED)) {
        return this.$nuxt.error({
          statusCode: 403,
          message: FORBIDDEN_OUTSIDE_OF_UNIV,
        })
      }
      if (this.forwardAfterSignInIfRequired() !== false) return
    }

    _userSignedInFirstLoad
      ? showElementByRefId(this, REF_AUTH_REQUIRED)
      : hideElementByRefId(this, REF_AUTH_REQUIRED)
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
        return this.forwardAfterSignInIfRequired()
      }

      await _signIn(this, { hd: 'ms.geidai.ac.jp' })
    },
    async othersSignIn() {
      if (this.$accessor.user) {
        debugLog('User already signed in')
        return this.forwardAfterSignInIfRequired()
      }

      await _signIn(this, { hd: 'fa.geidai.ac.jp' })
    },
    forwardAfterSignInIfRequired() {
      const { forward } = this.$route.query
      if (forward) {
        const to = `/${decodeURIComponent(forward as string)}`
        return this.$router.push(to)
      }
      return false
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
          container.classList.add(this.$style.GalleryImageContainerAnimated)
        })
      }
    },
  },
})

export default vue
</script>

<style lang="scss" scoped></style>

<style lang="scss" module>
.Section {
  &Container {
    padding: {
      top: 6rem;
      bottom: 6rem;
      left: 0.6rem;
      right: 0.6rem;
    }

    &:not(:last-child) {
      padding: {
        bottom: 4rem;
      }
    }
  }

  &Description {
    letter-spacing: 0.0875rem;
    line-height: 1.7;
    padding: {
      top: 2.5rem;
      bottom: 2.5rem;
    }
  }

  &Grid {
    grid-row-gap: 1rem;
    grid-template-columns: repeat(1, minmax(10em, auto));
    place-content: space-evenly;

    @media screen and (min-width: 30em) {
      grid-template-columns: repeat(2, minmax(10em, auto));
    }

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

    &::before {
      content: '';
      display: block;
      padding-top: 13rem;
    }
  }

  &Image {
    &Container {
      position: absolute;
      top: 0;
      left: 0;
      flex-wrap: nowrap;
      z-index: 0;

      &Animated {
        animation: slideshow infinite linear 0s both;
        animation-duration: var(--slideshowDuration, 0s);
      }
    }
    &Item {
      height: 12rem;
      width: auto;
      margin-right: 0.6rem;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
  }
}

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

.AuthRequiredSection {
  width: 100%;
}
</style>
