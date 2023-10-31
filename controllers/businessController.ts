import BusinessService from 'services/businessService'
import { IBusiness, IBusinessFilter } from 'types/IBusiness'

class BusinessController {
    regexNumbers(value): string {
        const valueFormatted = value.replace(/[^0-9]/g, '')
        return valueFormatted
    }
    async getAll(filters?: IBusinessFilter): Promise<IBusiness[]> {
        const urlParams = new URLSearchParams()
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters && filters[key] != undefined && filters[key] !== '') {
                    urlParams.append(`filters[${key}]`, filters[key])
                }
            })
        }
        const businessService = new BusinessService()
        return await businessService.getAll(urlParams)
    }

    async getById(id: string): Promise<IBusiness> {
        const businessService = new BusinessService()
        return await businessService.getById(id)
    }

    async update(id: string, business: IBusiness): Promise<IBusiness> {
        const businessService = new BusinessService()
        business.cnpj = this.regexNumbers(business.cnpj)
        if (business.contactPhone) {
            business.contactPhone = this.regexNumbers(business.contactPhone)
        }
        return await businessService.update(id, business)
    }

    async create(business: IBusiness): Promise<IBusiness> {
        const businessService = new BusinessService()
        business.cnpj = this.regexNumbers(business.cnpj)
        if (business.contactPhone) {
            business.contactPhone = this.regexNumbers(business.contactPhone)
        }
        return await businessService.create(business)
    }
}

export default BusinessController
