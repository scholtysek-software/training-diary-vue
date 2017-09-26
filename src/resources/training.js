import axios from 'axios'

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

export default {
  getTrainings
}
