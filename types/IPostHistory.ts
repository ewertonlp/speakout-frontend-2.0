import { UserInfo } from 'services/requests/user/types'
import { IMedia } from './IMedia'
import { IImageUpload } from './IImageUpload'

export type IPostHistoryCreate = {
    id?: string
    comment: string
    createdAt?: string
    updatedAt?: string
    media?: IMedia[] | string[]
    user: string
    tenant?: string
    post?: string
}

export type IPostHistory = {
    id?: string
    comment: string
    createdAt?: string
    updatedAt?: string
    media?: IImageUpload[]
    user: UserInfo
}
