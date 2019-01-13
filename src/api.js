import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getEmployees () {
    return this.execute('get', '/employees')
  },
  createEmployee (data) {
    return this.execute('post', '/employees', data)
  }
}
