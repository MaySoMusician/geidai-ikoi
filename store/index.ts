import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'nuxt-typed-vuex'

type User = {
  uid: string
  email: string
  displayName: string
  photoURL: string
}

export const state = () => ({
  user: null as null | User,
})

export const getters = getterTree(state, {
  user: (state) => state.user,
})

export const mutationNames = {
  ON_AUTH_STATE_CHANGED_MUTATION: 'ON_AUTH_STATE_CHANGED_MUTATION',
}

export const mutations = mutationTree(state, {
  [mutationNames.ON_AUTH_STATE_CHANGED_MUTATION]: (
    state,
    { authUser, _claims }
  ) => {
    if (!authUser) {
      state.user = null
    } else {
      const { uid, email, displayName, photoURL } = authUser
      state.user = { uid, email, displayName, photoURL }
    }
  },
})

export const actions = actionTree({ state, getters, mutations }, {})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
