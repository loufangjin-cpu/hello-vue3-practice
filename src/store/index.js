import { createStore } from 'vuex'
import { moduleA } from './moduleA.js'
import { moduleB } from './moduleB.js'
const store = createStore({
  // state: () => {},
  // mutations: {},
  // actions: {},
  modules: {
    moduleA,
    moduleB
  }
})
export default store
