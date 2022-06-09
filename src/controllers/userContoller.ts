import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { COMMON_MESSAGES, RESPONSE_CODES, USER_MESSAGES } from '@src/constants'
import { User } from '@src/models'
import { IEUser } from '@src/types'
import {
  createResponseErrorMessage,
  validateCreateUserParams
} from '@src/utils'

const controller = {
  save: (req: Request, res: Response) => {
    const params: IEUser = req.body
    const { name, surname, email, password } = params
    if (!validateCreateUserParams(params)) {
      return createResponseErrorMessage(
        res,
        RESPONSE_CODES.ERRORS.CLIENT_SIDE.BAD_REQUEST,
        COMMON_MESSAGES.INCORRET_DATA_VALIDATION
      )
    }

    const newUser = new User({
      name,
      surname,
      email
    })

    User.findOne({ email }, (err, issetUser) => {
      if (err) {
        return createResponseErrorMessage(
          res,
          RESPONSE_CODES.ERRORS.SERVER_SIDE.INTERNAL_SERVER_ERROR,
          USER_MESSAGES.ERROR_CHECK_USER_EXIST
        )
      }
      if (!issetUser) {
        bcrypt.hash(password, bcrypt.genSaltSync(10), (_err, hash) => {
          newUser.password = hash
          newUser.save((err, userStored) => {
            console.log({ err, userStored })
            if (err) {
              return createResponseErrorMessage(
                res,
                RESPONSE_CODES.ERRORS.SERVER_SIDE.INTERNAL_SERVER_ERROR,
                USER_MESSAGES.ERROR_SAVING_USER
              )
            }
            if (!userStored) {
              return createResponseErrorMessage(
                res,
                RESPONSE_CODES.ERRORS.SERVER_SIDE.INTERNAL_SERVER_ERROR,
                USER_MESSAGES.ERROR_SAVING_USER
              )
            }
            return res
              .status(RESPONSE_CODES.SUCCESS)
              .send({ success: true, user: userStored })
          })
        })
      } else {
        return createResponseErrorMessage(
          res,
          RESPONSE_CODES.ERRORS.SERVER_SIDE.INTERNAL_SERVER_ERROR,
          USER_MESSAGES.USER_ALRERY_REGISTERED
        )
      }
    })
  }
}

export default controller
