import { FirebaseModuleConfiguration } from '@nuxtjs/firebase'
import { mutationNames } from './store/index'

const config: FirebaseModuleConfiguration = {
  config: {
    apiKey: 'AIzaSyApe3b1woPg2ahZaE2Xa59H43rbssUI7Do',
    authDomain: 'auth8.geidai-ikoi.net',
    projectId: 'geidai-ikoi-01',
    storageBucket: 'geidai-ikoi-01.appspot.com',
    messagingSenderId: '898931287801',
    appId: '1:898931287801:web:956cef8b0dc718a9c22428',
    measurementId: 'G-JN7CYRMKDD',
  },
  services: {
    auth: {
      persistence: 'session',
      preload: true,
      initialize: {
        onAuthStateChangedMutation:
          mutationNames.ON_AUTH_STATE_CHANGED_MUTATION,
      },
    },
    analytics: true,
  },
  onFirebaseHosting: true,
}

export default config
