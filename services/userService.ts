import { IDashUser, IDashUserGet } from 'types/IDashUser'
import { IRole } from 'types/IRole'
import { IUpdatePassword } from 'types/IUpdatePassword'
import api from './api'
import apiWithoutResponseInterceptor from './apiWithoutResponseInterceptor'

class UserService {
    urlBaseService

    constructor() {
        this.urlBaseService = 'api/users'
    }

    async getAll(filters: string): Promise<IDashUser[]> {
        return await api.get(`${this.urlBaseService}?${filters}`)
    }

    async getById(id: string): Promise<IDashUserGet> {
        return await api.get(`${this.urlBaseService}/${id}`)
    }
    
    async create(user: IDashUser): Promise<IDashUser> {
        return await api.post('api/auth/local/register', user)
    }

    async update(id: string, user: IDashUser): Promise<IDashUser> {
        return await api.put(`${this.urlBaseService}/${id}`, user)
    }

    async getCurrentUserInfo(): Promise<IDashUserGet> {
        return await apiWithoutResponseInterceptor.get(`${this.urlBaseService}/find/me`)
    }

    async getAllRoles(): Promise<{ roles: IRole[] }> {
        return await api.get('api/users-permissions/roles')
    }

    async updateTenant(data: { tenant: string }, id: string) {
        await api.put(`${this.urlBaseService}/update-current-tenant/${id}`, { data: data })
    }

    async updatePassword(data: IUpdatePassword) {
        await api.post('/auth/change-password', data)
    }
}

export default UserService
