import { UserInfo } from '../user/types'

export interface LoginProps {
    identifier: string
    password: string
}

export interface RegisterProps {
    fullname: string
    email: string
    cpf: string
    password: string
}

export interface LoginRegisterResponseProps {
    jwt: string
    user: UserInfo
}

export interface ResetPasswordProps {
    password: string
    passwordConfirmation: string
    code: string
}

export interface ChangePasswordProps {
    currentPassword: string
    password: string
    passwordConfirmation: string
}
