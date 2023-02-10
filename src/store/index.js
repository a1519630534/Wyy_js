import { createStore } from 'vuex'
// import audio from './audio'
import audio from './modules/audio'
import userinfo from './modules/userinfo'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    audio,
    userinfo
  }
})
