export enum Role {
  Admin = 'admin',
  Viewer = 'viewer',
  Editor = 'editor'
}

export type Roles = Role.Admin | Role.Viewer | Role.Editor

export interface IEUser {
  name: string
  surname: string
  email: string
  password: string
  createAt: Date
  role?: Roles
}

export type Login = Pick<IEUser, 'email' | 'password'>
