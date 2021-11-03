import { createStore } from 'vuex'

export default createStore({
  state: {
    data: []
  },
  mutations: {
    push(state, data) {
      state.data.push(data);
    }
  },
  actions: {
  },
  modules: {
  }
})
