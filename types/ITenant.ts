import { IImageUpload } from './IImageUpload'

export type ITenant = {
    id: string
    createdAt?: string
    updatedAt?: string
    description: string
    status: boolean
    logo: string
    banner: string
    identity: string
    title_banner: string
    subtitle_banner: string
    linkcondutecode: string
}

export type ITenantGet = {
    id: string
    createdAt?: string
    updatedAt?: string
    description: string
    status: boolean
    logo: IImageUpload
    banner: IImageUpload
    identity: string
    title_banner: string
    subtitle_banner: string
    linkcondutecode: string
    linkRelato?: string
}
