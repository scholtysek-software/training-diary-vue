import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations'
import UserResource from './../resources/user'

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
    },
    [types.LOGOUT] (state) {
      state.isLoggedIn = false
      state.user = null
    }
  },
  actions: {
    login ({ commit }, creds) {
      commit(types.LOGIN) // show spinner
      return new Promise((resolve, reject) => {
        UserResource.login(creds.email, creds.password)
          .then(({ user, token }) => {
            localStorage.setItem('user', user)
            localStorage.setItem('token', token)
            this.state.user = user
            this.state.token = token
            commit(types.LOGIN_SUCCESS)
            resolve()
          })
          .catch(error => reject(error))
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
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
