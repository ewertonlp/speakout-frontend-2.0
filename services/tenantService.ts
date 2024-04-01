import { ICompanyInfo } from 'types/ICompanyInfo'
import { ITenant, ITenantGet } from 'types/ITenant'
import api from './api'

export default class TenantService {
    urlBaseService
    getBasicInformation(companyName: string): Promise<ICompanyInfo> {
        return api.get(`api/gettenantbyidentity/${companyName}`)
    }

    constructor() {
        this.urlBaseService = 'api/tenants'
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
