import { IBusiness } from 'types/IBusiness'
import api from './api'

class BusinessService {
    urlBaseService

    constructor() {
        this.urlBaseService = 'api/businesses'
    }

    async getAll(filters: URLSearchParams): Promise<IBusiness[]> {
        return await api.get(`${this.urlBaseService}?${filters}`)
    }

    async getById(id: string): Promise<IBusiness> {
        return await api.get(`${this.urlBaseService}/${id}`)
    }

    async create(business: IBusiness): Promise<IBusiness> {
        return await api.post(`${this.urlBaseService}`, {
            data: business,
        })
    }

    async update(id: string, business: IBusiness): Promise<IBusiness> {
        return await api.put(`${this.urlBaseService}/${id}`, {
            data: business,
        })
    }
}

export default BusinessService
