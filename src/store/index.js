import { createStore } from 'vuex'

export default createStore({
  state: {
    data: []
  },
  mutations: {
    push(state, data) {
      state.data.push(data);
    },
    initialiseStore(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		}
  },
  plugins: [
    (store) => {
      store.subscribe((mutation, state) => {
        localStorage.setItem('store', JSON.stringify(state));
      });
    }
  ],
  actions: {
  },
  modules: {
  }
})
