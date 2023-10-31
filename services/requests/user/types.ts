export interface UserInfo {
    id?: string
    username: string
    email: string
    provider: string
    cpf: string
    fullname: string
    confirmed: boolean
    blocked: boolean
    createdAt?: string
    updatedAt?: string
}

export interface UserCreationProps {
    username: string
    email: string
    password: string
}

export interface UserGetProps {
    id?: string
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt?: string
    updatedAt?: string
}
