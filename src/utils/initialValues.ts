import { DeliverymanGetProps } from 'services/requests/deliveryman/types'
import { IBusiness, IBusinessFilter } from 'types/IBusiness'
import { IDashUserFilter } from 'types/IDashUser'
import { IUser } from 'types/IUser'

export const userInitialValue = {
    id: 0,
    cpf: '',
    name: '',
    blocked: false,
    confirmed: true,
    email: '',
    provider: '',
    username: '',
} as IUser

export const deliverymanInitialValue = {
    business: 0,
    cpf: '',
    days: [],
    hourFinal: '',
    hourStart: '',
    name: '',
    phone: '',
    tenant: 0,
} as DeliverymanGetProps

export const businessInitialValue = {
    cnpj: '',
    contactName: '',
    contactPhone: '',
    fantasyName: '',
    reasonName: '',
    status: true,
} as IBusiness

export const businessFormDataInitialValue = {
    fantasyName: '',
    reasonName: '',
    cnpj: '',
    status: true,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    uf: '',
    cep: '',
}

export const businessFiltersInitialValue = {
    reasonName: '',
    cnpj: '',
    status: true,
} as IBusinessFilter

export const dashUserFiltersInitialValue = {
    username: '',
    email: '',
} as IDashUserFilter
