import { IArea } from 'types/IArea'
import api from './api'

export class AreaService {
    urlBaseService

    constructor() {
        this.urlBaseService = 'api/areas'
    }

    async create(data: IArea) {
        await api.post(this.urlBaseService, { data: data })
    }
    async getById(id: string): Promise<any> {
        return api.get(`${this.urlBaseService}/${id}`)
    }
    async getAll(): Promise<any> {
        return api.get(this.urlBaseService)
    }
    async update(data: IArea, id: string) {
        return api.put(`${this.urlBaseService}/${id}`, { data: data })
    }
}
