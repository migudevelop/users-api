import { Request, Response } from 'express'
// const bcrypt = require('bcryptjs')
import { COMMON_MESSAGES, RESPONSE_CODES } from '@src/constants'
// import { User } from '@src/models'
import { IEUser } from '@src/types'
import { createResponseErrorMessage, validateUserLoginParams } from '@src/utils'

const controller = {
  login: (req: Request, res: Response) => {
    const params: IEUser = req.body
    // const { name, surname, email, password } = params
    if (!validateUserLoginParams(params)) {
      return createResponseErrorMessage(
        res,
        RESPONSE_CODES.ERRORS.CLIENT_SIDE.BAD_REQUEST,
        COMMON_MESSAGES.INCORRET_DATA_VALIDATION
      )
    }
  }
}

export default controller
