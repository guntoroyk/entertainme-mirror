if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const PORT = process.env.PORT || 3002
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('tiny'))
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => console.log('app is listening on port', PORT))
