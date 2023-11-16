import api from './api'

export class ActionService {
    urlBaseService

    constructor() {
        this.urlBaseService = 'api/actions'
    }

    async create(data: any) {
        await api.post(this.urlBaseService, { data: data })
    }

    async update(data: any, id: string) {
        await api.post(`this.urlBaseService/${id}`, { data: data })
    }
}
