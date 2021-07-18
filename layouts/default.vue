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
              max-w="66rem"
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

          <TheModalNotice />

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
import SvgLogoTitle from '~/assets/logoTitle.min.svg?inline'

type ColorMode = 'light' | 'dark'

type Data = {
  colorModeFunction: (() => ColorMode) | null
  toggleColorModeFunction: ToggleColorModeFunction | null
  mainStyles: Record<string, Partial<{ bg: string; color: string }>>
  showDevSignOutButton: boolean
  loaded: boolean
}

type Methods = {
  signOut(): void
}

type Computed = {
  colorMode: ColorMode
  toggleColorMode: ToggleColorModeFunction
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  name: 'App',
  components: {
    AppSvgLoaderTea,
    SvgLogoTitle,
  },
  data() {
    return {
      colorModeFunction: null,
      toggleColorModeFunction: null,
      mainStyles: {
        dark: { bg: 'gray.700', color: 'whiteAlpha.900' },
        light: { bg: 'white', color: 'mineShaft' },
      },
      showDevSignOutButton: !!process.env.APP_DEBUG,
      loaded: false,
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
  mounted() {
    if (this.$refs.colorModeProvider) {
      const { _provided } = this.$refs.colorModeProvider as any
      this.colorModeFunction = _provided.$chakraColorMode
      this.toggleColorModeFunction = _provided.$toggleColorMode
    }

    this.$nextTick(() => {
      const setHeight = () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
      window.addEventListener('resize', setHeight)
      setHeight()
      this.loaded = true
    })
  },
  methods: {
    signOut() {
      this.$fire.auth.signOut()
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
  --theme-colors-azalea: #fad3d3;
  --theme-colors-mineShaft: #272727;
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
