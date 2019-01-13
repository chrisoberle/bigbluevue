const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

let app = express()
app.use(cors())
app.use(bodyParser.json())

let database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})

// define schema
let Employee = database.define('employees', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  address: Sequelize.STRING,
  company: Sequelize.STRING,
  salary: Sequelize.INTEGER
})

// Setup REST endpoints
epilogue.initialize({
  app: app,
  sequelize: database
})

let userResource = epilogue.resource({
  model: Employee,
  endpoints: ['/employees', '/employees/:id'],
  actions: ['list', 'create']
})

// Resets the database and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT || 8081)
    console.log(`listening to port ${process.env.PORT || 8081}`)
  })

