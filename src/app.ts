import express from 'express'
import dotenv from 'dotenv'
import { loginActions, usersRoutes } from '@routes/index'

dotenv.config()
const app = express()

const API_URL_NAME = '/api'

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Configure headers and CORS
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.use(API_URL_NAME, loginActions)
app.use(API_URL_NAME, usersRoutes)

export default app
