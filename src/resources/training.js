import axios from 'axios'
import moment from 'moment'

const url = ''

const getTrainings = (token) => {
  return new Promise((resolve, reject) => {
    axios({
      url: url + '/api/trainings',
      method: 'get',
      headers: {
        'x-auth': token
      }
    }).then((response) => {
      resolve(response.data.trainings)
    }).catch(error => reject(error))
  })
}

const createTraining = (date, token) => {
  return new Promise((resolve, reject) => {
    axios({
      url: url + '/api/trainings',
      method: 'post',
      headers: {
        'x-auth': token
      },
      data: {
        date: moment(date).unix()
      }
    }).then((response) => {
      resolve(response.data)
    }).catch(error => reject(error))
  })
}

const addExercise = (exercise, training, token) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${url}/api/trainings/${training._id}/exercises`,
      method: 'post',
      headers: {
        'x-auth': token
      },
      data: exercise
    }).then((response) => {
      resolve(response.data)
    }).catch(error => reject(error))
  })
}

const createSeries = (exercise, training, series, token) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${url}/api/trainings/${training._id}/exercises/${exercise._id}/series`,
      method: 'post',
      headers: {
        'x-auth': token
      },
      data: {
        order: 1, // @todo: Get rid of it
        repetition: series.reps,
        load: series.weight
      }
    }).then((response) => {
      resolve(response.data)
    }).catch(error => reject(error))
  })
}

export default {
  getTrainings,
  createTraining,
  addExercise,
  createSeries
}
