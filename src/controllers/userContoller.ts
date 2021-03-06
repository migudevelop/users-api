import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { RESPONSE_CODES, USER_MESSAGES } from '@src/constants'
import { User } from '@src/models'
import { IERequest, IEUser } from '@src/types'
import {
  createResponseErrorMessage,
  createResponseIncorretDataValidation,
  createResponseSuccess,
  validateCreateUserParams,
  validateUpdateUserParams
} from '@src/utils'

const controller = {
  save: (req: Request, res: Response) => {
    const params: IEUser = req.body
    const { name, surname, email, password } = params
    if (!validateCreateUserParams(params)) {
      return createResponseIncorretDataValidation(res)
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
            if (err ?? !userStored) {
              return createResponseErrorMessage(
                res,
                RESPONSE_CODES.ERRORS.SERVER_SIDE.INTERNAL_SERVER_ERROR,
                USER_MESSAGES.ERROR_SAVING_USER
              )
            }
            return createResponseSuccess(res, {
              user: userStored
            })
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
  },
  update: (req: IERequest, res: Response) => {
    const params: IEUser = req.body
    if (!validateUpdateUserParams(params)) {
      return createResponseIncorretDataValidation(res)
    }

    User.findOneAndUpdate(
      { _id: req?.user?._id },
      params,
      { new: true },
      (err, userUpdated) => {
        if (err ?? !userUpdated) {
          return createResponseErrorMessage(
            res,
            RESPONSE_CODES.ERRORS.SERVER_SIDE.INTERNAL_SERVER_ERROR,
            USER_MESSAGES.ERROR_UPDATING_USER
          )
        }
        return createResponseSuccess(res, { userUpdated })
      }
    )
  },
  delete: (req: Request, res: Response) => {
    User.deleteOne({ _id: req.params.userId })
      .then(({ deletedCount = 0 }) => {
        if (deletedCount === 0) {
          return createResponseErrorMessage(
            res,
            RESPONSE_CODES.ERRORS.SERVER_SIDE.INTERNAL_SERVER_ERROR,
            USER_MESSAGES.USER_NOT_EXIST
          )
        }
        return createResponseSuccess(res, { deletedCount })
      })
      .catch(() =>
        createResponseErrorMessage(
          res,
          RESPONSE_CODES.ERRORS.SERVER_SIDE.INTERNAL_SERVER_ERROR,
          USER_MESSAGES.ERROR_DELETING_USER
        )
      )
  },
  getUsers: (_req: Request, res: Response) => {
    User.find().exec((err, users) => {
      if (err ?? !users) {
        return createResponseErrorMessage(
          res,
          RESPONSE_CODES.ERRORS.CLIENT_SIDE.NOT_FOUND,
          USER_MESSAGES.USER_NOT_EXIST
        )
      }
      return createResponseSuccess(res, { users })
    })
  },
  getUser: (req: Request, res: Response) => {
    User.findById(req.params.userId).exec((err, user) => {
      if (err ?? !user) {
        return createResponseErrorMessage(
          res,
          RESPONSE_CODES.ERRORS.CLIENT_SIDE.NOT_FOUND,
          USER_MESSAGES.USER_NOT_EXIST
        )
      }
      return createResponseSuccess(res, { user })
    })
  }
}

export default controller
