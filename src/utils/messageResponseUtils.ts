import { Response } from 'express'
import { COMMON_MESSAGES, RESPONSE_CODES } from '@constants/index'

export const createResponseErrorMessage = (
  res: Response,
  errorCode: number,
  errorMessage: string
): Response => res.status(errorCode).send({ message: errorMessage })

export const createResponseIncorretDataValidation = (res: Response): Response =>
  createResponseErrorMessage(
    res,
    RESPONSE_CODES.ERRORS.CLIENT_SIDE.BAD_REQUEST,
    COMMON_MESSAGES.INCORRET_DATA_VALIDATION
  )

export const createResponseSuccess = (
  res: Response,
  responseData: any = {}
): Response =>
  res.status(RESPONSE_CODES.SUCCESS).send({ success: true, ...responseData })
