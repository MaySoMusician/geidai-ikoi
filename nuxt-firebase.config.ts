import { FirebaseModuleConfiguration } from '@nuxtjs/firebase'
import { mutationNames } from './store/index'

const config: FirebaseModuleConfiguration = {
  config: {
    apiKey: 'AIzaSyApe3b1woPg2ahZaE2Xa59H43rbssUI7Do',
    authDomain: 'geidai-ikoi-01.firebaseapp.com',
    projectId: 'geidai-ikoi-01',
    storageBucket: 'geidai-ikoi-01.appspot.com',
    messagingSenderId: '898931287801',
    appId: '1:898931287801:web:4bef235eb465f887c22428',
    measurementId: '',
  },
  services: {
    auth: {
      preload: true,
      initialize: {
        onAuthStateChangedMutation:
          mutationNames.ON_AUTH_STATE_CHANGED_MUTATION,
      },
    },
  },
  onFirebaseHosting: true,
}

export default config
