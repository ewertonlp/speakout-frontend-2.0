import { ITraining } from 'types/ITraining'
import api from './api'

export class TrainingService {
    urlBaseService

    constructor() {
        this.urlBaseService = 'api/tenantsbytreinamentos/'
    }

    async create(data: ITraining) {
        await api.post(this.urlBaseService, { data: data })
    }

    async getById(id: string): Promise<any> {
        console.log('passou aqui')
        return api.get(`${this.urlBaseService}/${id}`)
    }

    async getByStatus(status: number): Promise<any> {
        return api.get(`${this.urlBaseService}?status=${status}`)
    }

    async getAll(): Promise<any> {
        return api.get(this.urlBaseService)
    }

    async update(data: ITraining, id: string) {
        return api.put(`${this.urlBaseService}/${id}`, { data: data })
    }
    
}
