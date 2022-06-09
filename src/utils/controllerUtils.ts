export const createResponseErrorMessage = (
  res: any,
  errorCode: number,
  errorMessage: string
): any => res.status(errorCode).send({ message: errorMessage })
