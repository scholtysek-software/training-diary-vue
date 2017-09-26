import axios from 'axios'

const url = ''
let token
let user

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post(url + '/api/users/login', { email, password })
      .then(response => {
        token = response.headers['x-auth']
      })
      .then(() => axios({
        url: url + '/api/users/me',
        method: 'get',
        headers: {
          'x-auth': token
        }
      }))
      .then((response) => {
        user = {
          email: response.data.email
        }

        resolve({ user, token })
      })
      .catch(error => reject(error))
  })
}

const register = (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post(url + '/api/users', { email, password })
      .then(response => {
        token = response.headers['x-auth']
      })
      .then(() => axios({
        url: url + '/api/users/me',
        method: 'get',
        headers: {
          'x-auth': token
        }
      }))
      .then((response) => {
        user = {
          email: response.data.email
        }

        resolve({ user, token })
      })
      .catch(error => reject(error))
  })
}

const logout = (token) => {
  return new Promise((resolve, reject) => {
    axios({
      url: url + '/api/users/me/token',
      method: 'delete',
      headers: {
        'x-auth': token
      }
    }).then(response => resolve())
      .catch(error => reject(error))
  })
}

export default {
  login,
  register,
  logout
}
