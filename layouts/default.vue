<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider ref="colorModeProvider">
        <CBox font-family="body">
          <CReset />
          <div
            :class="[
              $style.Container,
              !loaded ? $style.FullHeightHiddenOverflowed : undefined,
            ]"
          >
            <CBox
              v-bind="mainStyles[colorMode]"
              :class="[$style.FullHeight]"
              max-w="48rem"
              mx="auto"
            >
              <!-- main -->
              <Nuxt />
              <!-- /main -->
              <!-- footer -->
              <CBox :class="[$style.Footer]" :pt="4">
                <CFlex
                  direction="column"
                  align="center"
                  min-h="1.8rem"
                  :py="2"
                  background-color="grass.50"
                >
                  <CButton
                    as="nuxt-link"
                    variant="link"
                    color="gray.500"
                    font-size="0.8rem"
                    font-weight="normal"
                    to="/about/"
                    white-space="normal"
                    mb="0.3rem"
                    >このサイトについて・連絡先</CButton
                  >
                  <CBox
                    font-size="0.75rem"
                    color="gray.500"
                    text-align="center"
                  >
                    <CText pb="0.2rem"
                      >&copy; 2021 K･WATANABE a.k.a. MaySoMusician</CText
                    ><CText pb="0.2rem">Designed by Kana Asanuma</CText
                    ><CText pb="0.2rem"
                      >Code available at
                      <CLink
                        href="https://github.com/MaySoMusician/geidai-ikoi"
                        is-external
                        >GitHub</CLink
                      >, licensed under MIT license.</CText
                    >
                  </CBox>
                </CFlex>
              </CBox>
              <!-- /footer -->
            </CBox>
          </div>
          <div v-if="modalNoticeLoad">
            <AppModal
              :is-open="modalNoticeOpen"
              :on-close="closeModalNotice"
              :portal-z-index="1999"
              is-centered
            >
              <AppModalContent>
                <AppModalHeader>{{
                  modalNoticeItem && modalNoticeItem.title
                }}</AppModalHeader>
                <AppModalCloseButton />
                <AppModalBody>{{
                  modalNoticeItem && modalNoticeItem.body
                }}</AppModalBody>
                <AppModalFooter>Footer</AppModalFooter>
              </AppModalContent>
              <AppModalOverlay />
            </AppModal>
          </div>

          <transition name="fadeOut">
            <div
              v-if="!loaded"
              :class="[$style.LoaderOverlay, $style.FullHeight]"
            >
              <div :class="[$style.LoaderInner, $style.FullHeight]">
                <AppSvgLoaderTea :class="[$style.LoaderIcon]" />
                <SvgLogoTitle class="LoaderTitle" />
              </div>
            </div>
          </transition>
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ToggleColorModeFunction } from '@/types/chakra-ui-bridge'
import AppSvgLoaderTea from '@/components/AppSvgLoaderTea.vue'
import {
  AppModal,
  AppModalOverlay,
  AppModalContent,
  AppModalHeader,
  AppModalFooter,
  AppModalBody,
  AppModalCloseButton,
} from '@/components/AppModal'
import {
  fetchNotionTableData,
  isValidModalNoticeItem,
  ModalNoticeItem,
} from '@/utils/notion'
import SvgLogoTitle from '~/assets/logoTitle.min.svg?inline'

type ColorMode = 'light' | 'dark'

type Data = {
  colorModeFunction: (() => ColorMode) | null
  toggleColorModeFunction: ToggleColorModeFunction | null
  mainStyles: Record<string, Partial<{ bg: string; color: string }>>
  showDevSignOutButton: boolean
  loaded: boolean
  modalNoticeLoad: boolean // Lazy load to get correct client width
  modalNoticeOpen: boolean
  modalNoticeItem: ModalNoticeItem | null
}

type Methods = {
  signOut(): void
  closeModalNotice(): void
}

type Computed = {
  colorMode: ColorMode
  toggleColorMode: ToggleColorModeFunction
}

let _modalNoticeShownTimestamp = 0

export default Vue.extend<Data, Methods, Computed, unknown>({
  name: 'App',
  components: {
    AppSvgLoaderTea,
    SvgLogoTitle,
    AppModal,
    AppModalOverlay,
    AppModalContent,
    AppModalHeader,
    AppModalFooter,
    AppModalBody,
    AppModalCloseButton,
  },
  data() {
    return {
      colorModeFunction: null,
      toggleColorModeFunction: null,
      mainStyles: {
        dark: { bg: 'gray.700', color: 'whiteAlpha.900' },
        light: { bg: 'white', color: 'gray.900' },
      },
      showDevSignOutButton: !!process.env.APP_DEBUG,
      loaded: false,
      modalNoticeLoad: false,
      modalNoticeOpen: true,
      modalNoticeItem: null,
    }
  },
  computed: {
    colorMode() {
      return this.colorModeFunction ? this.colorModeFunction() : 'light'
    },
    toggleColorMode() {
      return this.toggleColorModeFunction || (() => undefined)
    },
  },
  async mounted() {
    if (this.$refs.colorModeProvider) {
      const { _provided } = this.$refs.colorModeProvider as any
      this.colorModeFunction = _provided.$chakraColorMode
      this.toggleColorModeFunction = _provided.$toggleColorMode
    }

    const getCatalog = async () => {
      const rawItems = await fetchNotionTableData(
        this.$config.modalNoticesDatabaseId
      ).then((r) => r.json())
      if (!Array.isArray(rawItems))
        throw new Error('The items from ModalNotices database is not an array')
      return rawItems.filter((v) =>
        isValidModalNoticeItem(v)
      ) as ModalNoticeItem[]
    }

    const noticesCatalog = await getCatalog()
    const now = Math.round(Date.now() / 1000)
    const noticesAvailable = noticesCatalog
      .filter(
        (item) =>
          (item.releasedAt ? item.releasedAt <= now : true) &&
          (item.expiredAt ? item.expiredAt > now : true)
      )
      .sort((a, b) => {
        if (!a.releasedAt) {
          return !b.releasedAt ? 0 : +1
        }
        return !b.releasedAt ? -1 : a.releasedAt - b.releasedAt
      })

    if (noticesAvailable.length > 0) {
      this.modalNoticeItem = noticesAvailable[0]
    }

    this.$nextTick(() => {
      const setHeight = () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
      window.addEventListener('resize', setHeight)
      setHeight()
      this.loaded = true
      this.modalNoticeOpen = !!this.modalNoticeItem
      _modalNoticeShownTimestamp = Date.now()

      // Lazy load to get correct client width
      setTimeout(() => {
        this.modalNoticeLoad = true
      })
    })
  },
  methods: {
    signOut() {
      this.$fire.auth.signOut()
    },
    closeModalNotice() {
      this.modalNoticeOpen = false

      const existingStatus = this.$accessor.modalNotices.status.find(
        (item) => item.id === this.modalNoticeItem?.id
      )

      if (existingStatus) {
        this.$accessor.modalNotices.updateStatusEntry({
          id: existingStatus.id,
          shown: existingStatus.shown + 1,
          lastShown: _modalNoticeShownTimestamp,
        })
      } else {
        this.$accessor.modalNotices.addStatusEntry({
          id: this.modalNoticeItem!.id,
          shown: 1,
          lastShown: _modalNoticeShownTimestamp,
        })
      }

      this.modalNoticeItem = null
    },
  },
})
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

:root {
  --theme-colors-grass-50: #dbdad3;
  --theme-colors-grass-400: #9e9d89;
  --theme-colors-wafer: #e4d3cf;
  --theme-colors-cavernPink: #e2bcb7;
  --theme-colors-santafe: #b67162;
}
</style>

<style lang="scss" scoped>
.fadeOut {
  &-enter-active,
  &-leave-active {
    transition: all 0.4s 0.9s cubic-bezier(0.33, 1, 0.68, 1);
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

.LoaderTitle {
  --color: #78828a;
  height: 1rem;
  margin-top: 0.5rem;
}
</style>

<style lang="scss" module>
.Container {
  background: white;
}

.FullHeight {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}

.FullHeightHiddenOverflowed {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}

.Footer {
  position: sticky !important;
  top: 100vh;
  line-height: 100%;

  p {
    line-height: 100%;
  }

  button {
    line-height: 100%;
  }

  /* small {
    font-size: 0.74rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    p {
      margin: {
        bottom: 0.1em;
      }
    }
  } */
}

.Loader {
  &Overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: white;
    z-index: 2000;
  }

  &Inner {
    display: flex;
    place-content: center;
    place-items: center;
    flex-direction: column;
  }

  &Icon {
    max-width: 15vw;
    max-height: 15vh;
    transform: translateX(0.3em);
  }
}
</style>
