<template>
  <div class="container">
    <CThemeProvider>
      <CBox font-family="body">
        <CReset />
        <div
          :class="[
            $style.Container,
            !loaded ? $style.FullHeightHiddenOverflowed : undefined,
          ]"
        >
          <CBox :class="[$style.FullHeight]" max-w="48rem" mx="auto">
            <!-- main -->
            <Nuxt />
            <!-- /main -->
            <CBox :class="[$style.Footer]" :pt="4">
              <CFlex direction="column" align="center" min-h="1.8rem" :py="2">
                <CBox font-size="0.75rem" color="gray.500" text-align="center">
                  <CText pb="0.25rem"
                    >Powered by
                    <CLink as="nuxt-link" to="/" is-external
                      >藝大オンライン憩い</CLink
                    ></CText
                  >
                  <CText pb="0.2rem"
                    >&copy; 2021 MaySoMusician&emsp;See
                    <CLink as="nuxt-link" to="/about/" is-external>this</CLink>
                    for full attributions</CText
                  >
                </CBox>
              </CFlex>
            </CBox>
          </CBox>
        </div>
        <transition name="fadeOut">
          <div
            v-if="!loaded"
            :class="[$style.LoaderOverlay, $style.FullHeight]"
          >
            <div :class="[$style.LoaderInner, $style.FullHeight]">
              Loading...
            </div>
          </div>
        </transition>
      </CBox>
    </CThemeProvider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  loaded: boolean
}

type Methods = {
  signOut(): void
}

type Computed = {}

export default Vue.extend<Data, Methods, Computed, unknown>({
  name: 'App',
  components: {},
  data() {
    return {
      loaded: false,
    }
  },
  computed: {},
  mounted() {
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

/* CSS variables of theme colors applied onto :root are defined in default layout */
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
  background: #222;
  color: rgb(236, 236, 236);
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
}

.Loader {
  &Overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: #222;
    z-index: 2000;
  }

  &Inner {
    display: flex;
    place-content: center;
    place-items: center;
    flex-direction: column;
    color: rgb(236, 236, 236);
  }

  &Icon {
    max-width: 15vw;
    max-height: 15vh;
    transform: translateX(0.3em);
  }
}
</style>
