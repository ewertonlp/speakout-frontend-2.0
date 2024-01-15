import { IArea } from './IArea'
import { IRole } from './IRole'
import { ITenant } from './ITenant'

export type ISelectedUser = {
    fullname: string
    email: string
}

export type IDashUser = {
    id?: string
    fullname: string
    cpf?: string
    email: string
    password: string
    tenant: string
    blocked: boolean
    username: string
    role?: string
    areas?: string[]
}
export type IDashUserGet = {
    id: string
    username: string
    email: string
    provider: string
    password: string
    resetPasswordToken: string
    confirmationToken: string
    confirmed: boolean
    blocked: boolean
    fullname: string
    cpf?: string
    createdAt: string
    updatedAt: string
    comite: string
    tenant: ITenant
    role?: IRole
    areas?: IArea[]
}

export type IDashTempUserGet = {
    id: string
    username: string
    email: string
    provider: string
    password: string
    resetPasswordToken: string
    confirmationToken: string
    confirmed: boolean
    blocked: boolean
    fullname: string
    createdAt: string
    updatedAt: string
    comite: string
    tenant: ITenant
}

export type IDashUserFilter = {
    fullname: string
    email: string
    username: string
}
