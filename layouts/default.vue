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
              px="4px"
              box-shadow="2xl"
            >
              <CFlex class="header" h="3rem">
                <AppSpacer />
                <!--
                <CMenu>
                  <CMenuButton aria-label="メニューを開く" size="lg" px="unset">
                    <CIcon name="menu" />
                  </CMenuButton>
                  <CMenuList placement="bottom-end">
                    <CMenuItem>使い方</CMenuItem>
                  </CMenuList>
                </CMenu> -->
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
                      ><nuxt-link to="/about"
                        >このサイトについて</nuxt-link
                      ></CPopoverBody
                    >
                    <CPopoverBody><TheDarkModeButton /></CPopoverBody>
                  </AppPopoverContent>
                </CPopover>
              </CFlex>
              <!-- main -->
              <Nuxt />
              <!-- /main -->
              <CBox :class="[$style.Footer]" min-h="1.8rem" :mt="1">
                <CFlex direction="row" justify="space-between" min-h="1.8rem">
                  <CBox
                    font-size="0.75rem"
                    color="gray.500"
                    place-self="flex-end"
                  >
                    <CText pb="0.14rem"
                      >&copy; 2021 K･WATANABE a.k.a. MaySoMusician</CText
                    ><CText pb="0.1rem"
                      >Code available at
                      <CLink
                        href="https://github.com/MaySoMusician/geidai-ikoi"
                        is-external
                        >GitHub</CLink
                      >, licensed under MIT license.</CText
                    >
                  </CBox>

                  <AppSpacer />
                  <CButton
                    as="nuxt-link"
                    variant="link"
                    color="gray.500"
                    font-size="0.8rem"
                    font-weight="normal"
                    to="/about"
                    :mr="1"
                    >このサイトについて・連絡先</CButton
                  >
                  <CButton
                    v-if="showDevSignOutButton"
                    variant="ghost"
                    variant-color="red"
                    font-size="0.8rem"
                    font-weight="normal"
                    h="0.9rem"
                    @click="signOut"
                    >ログアウト</CButton
                  >
                </CFlex>
              </CBox>
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
import { AppPopoverContent } from '@/components/AppPopoverContent'

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
    AppPopoverContent,
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
</style>

<style lang="scss" module>
.Container {
  background: #ced2d6;
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
