import { Request, Response, NextFunction } from 'express'
import { COMMON_MESSAGES, RESPONSE_CODES } from '@src/constants'
import { createResponseErrorMessage } from '@src/utils'

export const authenticated = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  // const authorized = req?.headers?.authorization ?? false
  // if (!authorized) {
  //   createResponseErrorMessage(
  //     res,
  //     RESPONSE_CODES.ERRORS.CLIENT_SIDE.UNAUTHORIZED,
  //     COMMON_MESSAGES.UNAUTHORIZED_REQUEST
  //   )
  // }
  // const token = req?.headers?.authorization?.replace(/['"]+/g, '') ?? ''
  // let payload = null
  try {
    // payload = decodeToken(token)
    // if (payload.exp <= moment().unix())
    //   return res.status(401).send({ message: MESSAGES.TOKEN_EXPIRED })
  } catch (err) {
    return createResponseErrorMessage(
      res,
      RESPONSE_CODES.ERRORS.CLIENT_SIDE.FORBIDDEN,
      COMMON_MESSAGES.NOT_VALID_TOKEN
    )
  }
  // req?.user = payload
  next()
}
