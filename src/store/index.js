import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations'
import UserResource from './../resources/user'
import TrainingResource from './../resources/training'

Vue.use(Vuex)

const getUser = () => {
  const email = localStorage.getItem('user')
  if (email) {
    return {
      email: localStorage.getItem('user')
    }
  }

  return null
}

const getTrainings = () => {
  if (localStorage.getItem('trainings')) {
    return JSON.parse(localStorage.getItem('trainings'))
  }

  return []
}

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    user: getUser(),
    trainings: getTrainings()
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
      state.trainings = []
      state.token = null
    }
  },
  actions: {
    register ({ commit }, creds) {
      commit(types.LOGIN) // show spinner
      return new Promise((resolve, reject) => {
        UserResource.register(creds.email, creds.password)
          .then(({ user, token }) => {
            localStorage.setItem('user', user.email)
            localStorage.setItem('token', token)
            this.state.user = user
            this.state.token = token
            commit(types.LOGIN_SUCCESS)
            resolve(user)
          })
          .catch(error => reject(error))
      })
    },
    login ({ commit }, creds) {
      commit(types.LOGIN) // show spinner
      return new Promise((resolve, reject) => {
        UserResource.login(creds.email, creds.password)
          .then(({ user, token }) => {
            localStorage.setItem('user', user.email)
            localStorage.setItem('token', token)
            this.state.user = user
            this.state.token = token
            commit(types.LOGIN_SUCCESS)
            resolve(user)
          })
          .catch(error => reject(error))
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('trainings')
      commit(types.LOGOUT)
    },
    getTrainings ({ commit }) {
      return new Promise((resolve, reject) => {
        TrainingResource.getTrainings(this.state.token)
          .then(trainings => {
            localStorage.setItem('trainings', JSON.stringify(trainings))
            this.state.trainings = trainings
            resolve(trainings)
          })
          .catch(error => reject(error))
      })
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    user: state => {
      return state.user
    },
    token: state => {
      return state.token
    },
    trainings: state => {
      return state.trainings
    }
  }
})
