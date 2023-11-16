import { IPostAction } from 'types/IPostAction'
import api from './api'

export class PostActionService {
    urlBaseService

    constructor() {
        this.urlBaseService = 'api/postactions'
    }

    async getAll(): Promise<any> {
        return await api.get(this.urlBaseService)
    }

    async getById(id: string): Promise<any> {
        return await api.get(`${this.urlBaseService}/${id}`)
    }

    async update(data: IPostAction, id: string) {
        await api.put(`${this.urlBaseService}/${id}`, { data: data })
    }

    async create(data: IPostAction) {
        await api.post(this.urlBaseService, { data: data })
    }
}
