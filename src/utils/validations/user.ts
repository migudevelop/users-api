import validator from 'validator'
import { IEUser } from '@src/types'
const { isEmpty, isEmail } = validator

export const validateCreateUserParams = ({
  name = '',
  surname = '',
  email = '',
  password = ''
}: IEUser): boolean => {
  try {
    const validateName: boolean = !isEmpty(name)
    const validateSurname: boolean = !isEmpty(surname)
    const validateEmail: boolean = !isEmpty(email) && isEmail(email)
    const validatePassword: boolean = !isEmpty(password)
    return validateName && validateSurname && validateEmail && validatePassword
  } catch (error) {
    return false
  }
}

export const validateUpdateUserParams = ({
  name = '',
  surname = '',
  email = ''
}: IEUser): boolean => {
  try {
    const validateName: boolean = !isEmpty(name)
    const validateSurname: boolean = !isEmpty(surname)
    const validateEmail: boolean = !isEmpty(email) && isEmail(email)
    return validateName && validateSurname && validateEmail
  } catch (error) {
    return false
  }
}
