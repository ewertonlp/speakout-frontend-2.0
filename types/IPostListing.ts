import { IDashUserGet } from './IDashUser'
import { IImageUpload } from './IImageUpload'
import { IPostActionGet } from './IPostAction'
import { IPostClosed } from './IPostClosed'
import { IPostHistory } from './IPostHistory'

export type IUser = {
    id: number
    username: string
    email: string
    fullname: string
    cpf: string
}

export type IPostListing = {
    id: string
    protocol: string
    status: string
    createdAt: string
    postcloseds: IPostClosed[]
    tenant: {
        id: number
        description: string
    }
    type: string
    company: string
    response: any
    sensibilidade: string
    sensibilidadeNum: number
    media: IImageUpload[]
    users: IDashUserGet[]
    posthistories: IPostHistory[]
    postactions: IPostActionGet[]
    date_closed: string
}

export type IPostListingFilter = {
    sensibilidade: string
    type: string
    protocol: string
}
