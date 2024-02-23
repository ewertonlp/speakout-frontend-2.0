import { IMedia } from './IMedia'

export type IPostClosed = {
    id?: string
    comment: string
    tenant: string
    createdAt?: string
    updatedAt?: string
    media?: IMedia[] | string[]
    user: string
    date_close: Date | string
    post: string
    emailDenunciante?: string
}
