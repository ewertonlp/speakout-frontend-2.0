import { IUser } from './IUser'

export type ILogin = {
    jwt: string
    user: IUser
}

export type ILoginForm = {
    identifier: string
    password: string
}

export type IRegisterForm = {
    username: string
    email: string
    password: string
    fullname: string
    cpf: string
}

export type ILoginForgotPassword = {
    email: string
}

export type INewPassword = {
    password: string
    passwordConfirmation: string
    code: string
}
