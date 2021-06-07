<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider ref="colorModeProvider">
        <CBox font-family="body">
          <CReset />
          <div :class="[$style.Container]">
            <CBox
              v-bind="mainStyles[colorMode]"
              :class="[$style.FullHeight]"
              max-w="48rem"
              mx="auto"
            >
              <!-- <CFlex class="header" h="3rem">
                <AppSpacer />
                <CPopover placement="bottom-end">
                  <CPopoverTrigger>
                    <CIconButton icon="menu" size="lg" />
                  </CPopoverTrigger>
                  <AppPopoverContent
                    z-index="popover"
                    :gutter="2"
                    max-w="13em"
                    box-shadow="lg"
                  >
                    <CPopoverBody
                      ><nuxt-link to="/about/"
                        >このサイトについて</nuxt-link
                      ></CPopoverBody
                    >
                    <CPopoverBody><TheDarkModeButton /></CPopoverBody>
                  </AppPopoverContent>
                </CPopover>
              </CFlex> -->
              <!-- main -->
              <Nuxt />
              <!-- /main -->
              <CFlex
                :class="[$style.Footer]"
                direction="column"
                align="center"
                min-h="1.8rem"
                :mt="4"
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
                <CBox font-size="0.75rem" color="gray.500" text-align="center">
                  <CText pb="0.2rem"
                    >&copy; 2021 K･WATANABE a.k.a. MaySoMusician</CText
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
          </div>
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ToggleColorModeFunction } from '@/types/chakra-ui-bridge'
// import { AppPopoverContent } from '@/components/AppPopoverContent'

type ColorMode = 'light' | 'dark'

type Data = {
  colorModeFunction: (() => ColorMode) | null
  toggleColorModeFunction: ToggleColorModeFunction | null
  mainStyles: Record<string, Partial<{ bg: string; color: string }>>
  showDevSignOutButton: boolean
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
    // AppPopoverContent,
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
}

:root {
  --theme-colors-grass-50: #dbdad3;
  --theme-colors-grass-400: #9e9d89;
  --theme-colors-wafer: #e4d3cf;
  --theme-colors-cavernPink: #e2bcb7;
  --theme-colors-santafe: #b67162;
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
</style>
