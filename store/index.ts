import { GetterTree, ActionTree, MutationTree } from 'vuex'

type User = {
  uid: string
  email: string
  displayName: string
  photoURL: string
}

export const state = () => ({
  user: null as null | User,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  user: (state) => state.user,
}

export const mutationNames = {
  ON_AUTH_STATE_CHANGED_MUTATION: 'ON_AUTH_STATE_CHANGED_MUTATION',
}

export const mutations: MutationTree<RootState> = {
  [mutationNames.ON_AUTH_STATE_CHANGED_MUTATION]: (
    state,
    { authUser, _claims }
  ) => {
    if (!authUser) {
      state.user = null
    } else {
      const { uid, email, displayName, photoURL } = authUser
      console.log(email)
      state.user = { uid, email, displayName, photoURL }
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {}
