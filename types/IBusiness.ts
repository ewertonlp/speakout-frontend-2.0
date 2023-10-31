import { IAddress } from './IAddress'

export type IBusiness = {
    id?: string
    fantasyName?: string
    reasonName: string
    cnpj: string
    status: boolean
    contactEmail?: string
    contactPhone?: string
    contactName?: string
    address?: IAddress
}

export interface IBusinessFormData extends IAddress {
    id?: string
    fantasyName?: string
    reasonName: string
    cnpj: string
    status: boolean
    contactEmail?: string
    contactPhone?: string
    contactName?: string
}

export type IBusinessFilter = {
    reasonName?: string
    cnpj?: string
    status?: boolean
}
