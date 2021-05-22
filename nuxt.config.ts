import { NuxtConfig } from '@nuxt/types'
import { MetaInfo } from 'vue-meta'

import nuxtFirebaseConfiguration from './nuxt-firebase.config'
import {
  extendTheme as chakraUiExtendedTheme,
  customIcons,
} from './nuxt-chakra-ui.config'
import { WEBSITE_NAME, WEBSITE_DESCRIPTION } from './utils/constants'

const generateLazyFontLinkTags = (url: string, preconnect?: string) => {
  const tags: MetaInfo['link'] = [
    { rel: 'preload', as: 'style', href: url },
    {
      rel: 'stylesheet',
      media: 'print',
      onload: "this.media='all'",
      href: url,
    },
  ]
  if (preconnect)
    tags.push({
      rel: 'preconnect',
      href: preconnect,
      crossOrigin: 'anonymous',
    })
  return tags
}

const hid = (info: Exclude<MetaInfo['meta'], undefined>[number]) => {
  if (info.name) {
    const { name, ...others } = info
    return { hid: name, name, ...others }
  }
  if (info.property) {
    const { property, ...others } = info
    return { hid: property, property, ...others }
  }

  throw new Error('unknown meta info')
}

const config: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: WEBSITE_NAME,
    htmlAttrs: { lang: 'ja' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      hid({ name: 'description', content: WEBSITE_DESCRIPTION }),
      hid({ property: 'og:type', content: 'website' }),
      hid({ property: 'og:site_name', content: WEBSITE_NAME }),
      hid({ property: 'og:description', content: WEBSITE_DESCRIPTION }),
      hid({ property: 'og:locale', content: 'website' }),
      hid({ name: 'robots', content: 'noindex' }),
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ...generateLazyFontLinkTags(
        'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&display=swap',
        'https://fonts.gstatic.com'
      ),
      ...generateLazyFontLinkTags(
        'https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap'
      ),
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/vue-gtag.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://typed-vuex.roe.dev/
    'nuxt-typed-vuex',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    // https://github.com/nuxt-community/style-resources-module/
    '@nuxtjs/style-resources',
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

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/
  generate: {
    fallback: true,
  },

  router: {
    trailingSlash: true,
    middleware: ['redirect'],
  },

  firebase: nuxtFirebaseConfiguration,

  emotion: {
    ssr: false,
  },

  chakra: {
    config: {
      autoImport: true,
    },
    extendTheme: chakraUiExtendedTheme,
    icons: {
      extend: {
        ...customIcons,
      },
    },
  },

  publicRuntimeConfig: {
    configDatabaseId: process.env.NOTION_DATABASE_CONFIG,
    newsDatabaseId: process.env.NOTION_DATABASE_NEWS,
    meetLinksDatabaseId: process.env.NOTION_DATABASE_MEETLINKS,
  },

  styleResources: {
    scss: ['~assets/abstracts/_mixins.scss'],
  },
}

if (!config.env) {
  config.env = {}
}

if (process.env.APP_DEBUG && process.env.APP_DEBUG !== '0') {
  // eslint-disable-next-line no-console
  console.log('!!! APPLICATION DEBUG ENABLED !!!')
  config.env.APP_DEBUG = process.env.APP_DEBUG
}

export default config
