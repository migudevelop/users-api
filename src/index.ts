import { connect } from 'mongoose'
import app from './app'
import dotenv from 'dotenv'

dotenv.config()
const port: string = process?.env?.PORT ?? '3005'
const dbURL: string = process?.env?.DB_URL ?? ''
const dbName: string = process?.env?.DB_NAME ?? ''
connect(`${dbURL}/${dbName}`)
  .then(() => {
    app.listen(port, () => console.log(`Conected in port: ${port}`))
  })
  .catch((err) => console.log(err))
