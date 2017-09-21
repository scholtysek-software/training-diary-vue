import axios from 'axios'
const url = ''

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    let token

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
        const user = {
          email: response.data.email
        }

        resolve({ user, token })
      })
      .catch(error => reject(error))
  })
}

export default {
  login
}
