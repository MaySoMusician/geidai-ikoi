import { NuxtConfig } from '@nuxt/types'
import { MetaInfo } from 'vue-meta'

import nuxtFirebaseConfiguration from './nuxt-firebase.config'
import {
  extendTheme as chakraUiExtendedTheme,
  customIcons,
} from './nuxt-chakra-ui.config'
import { WEBSITE_NAME, WEBSITE_DESCRIPTION, VIEWPORTS } from './utils/constants'

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
  // Enable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // for full static generation
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (titleChunk) => {
      // WEBSITE_NAME from utils/constants.ts
      const name = '藝大 オンライン憩い ☕'
      return titleChunk ? `${titleChunk} | ${name}` : name
    },
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
      ...generateLazyFontLinkTags(
        'https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap'
      ),
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-gtag.ts',
    { src: '@/plugins/vuex-persistedstate.client.ts', mode: 'client' },
  ],

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
    // https://image.nuxtjs.org/
    '@nuxt/image',
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
    // Exclude pages from SSG
    exclude: ['/meet/'] as any,
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
    modalNoticesDatabaseId: process.env.NOTION_DATABASE_MODALNOTICES,
  },

  styleResources: {
    scss: ['~assets/abstracts/_mixins.scss'],
  },

  image: {
    screens: VIEWPORTS,
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
