import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { RESPONSE_CODES, USER_MESSAGES } from '@src/constants'
import { User } from '@src/models'
import { IELogin } from '@src/types'
import {
  createResponseErrorMessage,
  createResponseIncorretDataValidation,
  createResponseSuccess,
  createToken,
  validateUserLoginParams
} from '@src/utils'

const controller = {
  login: (req: Request, res: Response) => {
    const params: IELogin = req.body
    const { email, password } = params
    if (!validateUserLoginParams(params)) {
      return createResponseIncorretDataValidation(res)
    }
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return createResponseErrorMessage(
          res,
          RESPONSE_CODES.ERRORS.SERVER_SIDE.INTERNAL_SERVER_ERROR,
          USER_MESSAGES.ERROR_IDENTIFY
        )
      }
      if (!user) {
        return createResponseErrorMessage(
          res,
          RESPONSE_CODES.ERRORS.CLIENT_SIDE.NOT_FOUND,
          USER_MESSAGES.USER_NOT_EXIST
        )
      }
      bcrypt.compare(password, user.password, (_err, check) => {
        user.password = null
        if (check) {
          return createResponseSuccess(res, { user, token: createToken(user) })
        }
        return createResponseErrorMessage(
          res,
          RESPONSE_CODES.ERRORS.CLIENT_SIDE.UNAUTHORIZED,
          USER_MESSAGES.INCORRECT_CREDENTIALS
        )
      })
    })
  }
}

export default controller
