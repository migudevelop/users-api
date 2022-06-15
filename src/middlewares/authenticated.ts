import { Response, NextFunction } from 'express'
import moment from 'moment'
import { COMMON_MESSAGES, RESPONSE_CODES } from '@src/constants'
import { createResponseErrorMessage, decodeToken } from '@src/utils'

export const authenticated = (
  req: any,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined => {
  const authorized = req?.headers?.authorization ?? false
  if (!authorized) {
    createResponseErrorMessage(
      res,
      RESPONSE_CODES.ERRORS.CLIENT_SIDE.UNAUTHORIZED,
      COMMON_MESSAGES.UNAUTHORIZED_REQUEST
    )
  }
  const token = req?.headers?.authorization?.replace(/['"]+/g, '') ?? ''
  let payload: any = null
  try {
    payload = decodeToken(token)
    if (payload?.exp <= moment().unix()) {
      return res
        .status(RESPONSE_CODES.ERRORS.CLIENT_SIDE.UNAUTHORIZED)
        .send({ message: COMMON_MESSAGES.TOKEN_EXPIRED })
    }
  } catch (err) {
    return createResponseErrorMessage(
      res,
      RESPONSE_CODES.ERRORS.CLIENT_SIDE.FORBIDDEN,
      COMMON_MESSAGES.NOT_VALID_TOKEN
    )
  }
  req.user = payload
  next()
}
