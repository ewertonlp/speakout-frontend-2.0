import { ICompanyInfo } from 'types/ICompanyInfo'
import { ITenant, ITenantGet } from 'types/ITenant'
import api from './api'

export default class TenantService {
    urlBaseService
    getBasicInformation(companyName: string): Promise<ICompanyInfo> {
        console.log(companyName)
        return api.get(`/gettenantbyidentity/${companyName}`)
    }

    constructor() {
        this.urlBaseService = '/tenants'
    }

    async create(data: ITenant) {
        await api.post(this.urlBaseService, { data: data })
    }
    async update(data: ITenant, id: string) {
        await api.put(`${this.urlBaseService}/${id}`, { data: data })
    }
    async getAll(filters?: URLSearchParams): Promise<ITenantGet[]> {
        return await api.get(`${this.urlBaseService}?${filters}`)
    }
    async getById(id: string): Promise<ITenantGet> {
        return api.get(`${this.urlBaseService}/${id}`)
    }
}
