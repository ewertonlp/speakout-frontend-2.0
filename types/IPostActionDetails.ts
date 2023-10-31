import { IDashUser } from './IDashUser'
import { IMedia } from './IMedia'

export type IPostActionDetails = {
    postaction: string
    title: string
    description: string
    media?: string[]
    user: string
}

export type IPostActionDetailsGet = {
    id: string
    postaction: string
    title: string
    description: string
    media?: IMedia[]
    user: IDashUser
    createdAt: string
}
