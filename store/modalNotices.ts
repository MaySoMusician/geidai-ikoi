import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

type StatusEntry = {
  id: string
  shown: number
  lastShown: number
}

export const state = () => ({
  status: [] as StatusEntry[],
})

export const getters = getterTree(state, {
  status: (state) => state.status,
})

export const mutations = mutationTree(state, {
  setStatus(state, newValue: StatusEntry[]) {
    state.status = newValue
  },
  addStatusEntry(state, newEntry: StatusEntry) {
    state.status.push(newEntry)
  },
  updateStatusEntry(state, newEntry: StatusEntry) {
    const entry = state.status.find((item) => item.id === newEntry.id)
    if (!entry) {
      return
    }
    entry.shown = newEntry.shown
    entry.lastShown = newEntry.lastShown
  },
})

export const actions = actionTree({ state, getters, mutations }, {})
