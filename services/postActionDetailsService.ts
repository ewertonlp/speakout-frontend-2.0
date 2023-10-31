import { IPostActionDetails } from 'types/IPostActionDetails'
import api from './api'

export class PostActionDetailsService {
    urlBaseService

    constructor() {
        this.urlBaseService = 'api/postactionsdetails'
    }

    async getAll(): Promise<any> {
        return await api.get(this.urlBaseService)
    }

    async getById(id: string): Promise<any> {
        return await api.get(`${this.urlBaseService}/${id}`)
    }

    async update(data: IPostActionDetails, id: string) {
        await api.put(`${this.urlBaseService}/${id}`, { data: data })
    }

    async delete(id: string) {
        await api.delete(`${this.urlBaseService}/${id}`)
    }

    async create(data: IPostActionDetails) {
        await api.post(this.urlBaseService, { data: data })
    }
}
