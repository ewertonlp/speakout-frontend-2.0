type IPng = {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path?: string
    size: number
    width: number
    height: number
}

export type ICompanyInfo = {
    id: string
    description: string
    status: true
    linkcondutecode: string
    identity: string
    title_banner: string
    subtitle_banner: string
    logo: {
        id: number
        formats: string
        width: number
        height: number
        url: string
    }
    banner: {
        id: number
        formats: {
            large: IPng
            small: IPng
            medium: IPng
            thumbnail: IPng
        }
        width: number
        height: number
        url: string
    }
}
