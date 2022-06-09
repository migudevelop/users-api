import validator from 'validator'
import { Login } from '@src/types'
const { isEmpty, isEmail } = validator

export const validateUserLoginParams = ({
  email = '',
  password = ''
}: Login): boolean => {
  try {
    const validateEmail: boolean = !isEmpty(email) && isEmail(email)
    const validatePassword: boolean = !isEmpty(password)
    return validateEmail || validatePassword
  } catch (error) {
    return false
  }
}
