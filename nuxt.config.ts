import { NuxtConfig } from '@nuxt/types'
import nuxtFirebaseConfiguration from './nuxt-firebase.config'
import { extendTheme as chakraUiExtendedTheme } from './nuxt-chakra-ui.config'

const generateLazyFontLinkTags = (preconnect: string, url: string) => {
  return [
    { rel: 'preconnect', href: preconnect, crossOrigin: 'anonymous' },
    { rel: 'preload', as: 'style', href: url },
    {
      rel: 'stylesheet',
      media: 'print',
      onload: "this.media='all'",
      href: url,
    },
  ]
}

const config: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'geidai-ikoi',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ...generateLazyFontLinkTags(
        'https://fonts.gstatic.com',
        'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&display=swap'
      ),
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://typed-vuex.roe.dev/
    'nuxt-typed-vuex',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://firebase.nuxtjs.org/guide/options/
    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  firebase: nuxtFirebaseConfiguration,

  chakra: {
    config: {
      autoImport: true,
    },
    extendTheme: chakraUiExtendedTheme,
  },
}

export default config
