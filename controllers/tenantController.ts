import TenantService from 'services/tenantService'
import { ICompanyInfo } from 'types/ICompanyInfo'
import { ITenant, ITenantGet } from 'types/ITenant'

export default class TenantController {
    getBasicInformation(companyName: string): Promise<ICompanyInfo> {
        const tenantService = new TenantService()
        return tenantService.getBasicInformation(companyName)
    }

    async getAll(filters?: { status: boolean }): Promise<ITenantGet[]> {
        const urlParams = new URLSearchParams()
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters && filters[key] != undefined && filters[key] !== '') {
                    urlParams.append(`filters[${key}]`, filters[key])
                }
            })
        }

        const tenantService = new TenantService()
        return await tenantService.getAll(urlParams)
    }

    async getById(id: string): Promise<ITenantGet> {
        const tenantService = new TenantService()
        return await tenantService.getById(id)
    }

    async update(data: ITenant, id: string) {
        const tenantService = new TenantService()
        return await tenantService.update(data, id)
    }

    async create(data: ITenant) {
        const tenantService = new TenantService()
        return await tenantService.create(data)
    }
}
