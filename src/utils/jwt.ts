import { IEUser } from '@src/types'
import jwt from 'jsonwebtoken'
const CONFIG_KEY = process?.env?.TOKEN_SECRET ?? ''

export const createToken = ({
  _id,
  name,
  surname,
  email,
  role
}: IEUser): string => {
  const payload = {
    _id,
    name,
    surname,
    email,
    role
  }

  return jwt.sign(payload, CONFIG_KEY, { expiresIn: '7d' })
}

export const decodeToken = (token: string): any => jwt.verify(token, CONFIG_KEY)
