export enum Role {
  Admin = 'admin',
  Viewer = 'viewer',
  Editor = 'editor'
}

export type Roles = Role.Admin | Role.Viewer | Role.Editor

export interface IEUser {
  _id: String
  name: string
  surname: string
  email: string
  password: string
  createAt: Date
  role?: Roles
}
export interface IEPayloadJwt extends IEUser {
  exp?: number | string
}

export type IELogin = Pick<IEUser, 'email' | 'password'>
