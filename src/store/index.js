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
    trainings: getTrainings(),
    trainingToDisplay: 0,
    isOpenCreateTrainingModal: false
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
    },
    [types.TRAININGS] (state, trainings) {
      state.trainings = trainings
    },
    [types.NEXT_TRAINING] (state) {
      state.trainingToDisplay++
    },
    [types.PREVIOUS_TRAINING] (state) {
      state.trainingToDisplay--
    },
    [types.OPEN_CREATE_TRAINING_MODAL] (state) {
      state.isOpenCreateTrainingModal = true
    },
    [types.CLOSE_CREATE_TRAINING_MODAL] (state) {
      state.isOpenCreateTrainingModal = false
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
      return new Promise((resolve, reject) => {
        UserResource.logout(this.state.token)
          .then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('trainings')
            commit(types.LOGOUT)
            resolve()
          })
          .catch(error => reject(error))
      })
    },
    getTrainings ({ commit }) {
      return new Promise((resolve, reject) => {
        TrainingResource.getTrainings(this.state.token)
          .then(trainings => {
            localStorage.setItem('trainings', JSON.stringify(trainings))
            commit(types.TRAININGS, trainings)
            resolve(trainings)
          })
          .catch(error => reject(error))
      })
    },
    createTraining ({ commit }, date) {
      return new Promise((resolve, reject) => {
        TrainingResource.createTraining(date, this.state.token)
          .then(training => resolve(training))
          .catch(error => reject(error))
      })
    },
    addExercise ({ commit }, { exercise, training }) {
      return new Promise((resolve, reject) => {
        TrainingResource.addExercise(exercise, training, this.state.token)
          .then(training => resolve(training))
          .catch(error => reject(error))
      })
    },
    openCreateTrainingModal ({ commit }) {
      commit(types.OPEN_CREATE_TRAINING_MODAL)
    },
    closeCreateTrainingModal ({ commit }) {
      commit(types.CLOSE_CREATE_TRAINING_MODAL)
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
    },
    trainingToDisplay: state => {
      return state.trainingToDisplay
    },
    isOpenCreateTrainingModal: state => {
      return state.isOpenCreateTrainingModal
    }
  }
})
