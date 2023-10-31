import { IDashUserGet } from './IDashUser'
import { IImageUpload } from './IImageUpload'
import { IPostActionDetailsGet } from './IPostActionDetails'

export type IPostAction = {
    title: string
    description: string
    media?: string[]
    status: IPostActionStatus
    user: string
    postactionsdetails?: string
    post: string
}

export type IPostActionGet = {
    id: string
    title: string
    description: string
    media: IImageUpload[]
    status: IPostActionStatus
    user: IDashUserGet
    postactionsdetails: IPostActionDetailsGet[]
    post: string
    createdAt: string
}

export const statusEnum = {
    active: 'Ativa',
    deactive: 'Inativa',
    closed: 'Encerrada',
}

export type IPostActionStatus = 'active' | 'deactive' | 'closed'
