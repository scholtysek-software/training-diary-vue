import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: localStorage.getItem('user')
  },
  mutations: {
    [types.LOGIN] (state) {
      state.pending = true
    },
    [types.LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
      state.user = {
        email: 'test@test.com'
      }
    },
    [types.LOGOUT] (state) {
      state.isLoggedIn = false
      state.user = null
    }
  },
  actions: {
    login ({ commit }, creds) {
      commit(types.LOGIN) // show spinner
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token', 'JWT')
          commit(types.LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit(types.LOGOUT)
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    user: state => {
      return state.user
    }
  }
})
