if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const PORT = process.env.PORT || 3002
const MONGO_URI = process.env.MONGO_URI
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('tiny'))
app.use('/', routes)
app.use(errorHandler)

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(_ => {
    console.log('connected to mongodb!')
  })
  .catch(err => {
    console.log('Failed connect to mongodb!')
  })


app.listen(PORT, () => console.log('app.listening on port', PORT))
