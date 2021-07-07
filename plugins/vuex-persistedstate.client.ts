import createPersistedState from 'vuex-persistedstate'
import type { Plugin } from '@nuxt/types'

const plugin: Plugin = ({ store }) => {
  createPersistedState({
    key: 'appState01',
    paths: ['modalNotices.status'],
  })(store)
}

export default plugin
