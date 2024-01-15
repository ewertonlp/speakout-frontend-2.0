import UserService from 'services/userService'
import { removeMask } from 'src/utils/functions'
import MapperUrlParams from 'src/utils/mapperUrlParams'
import { IDashUser, IDashUserFilter, IDashUserGet } from 'types/IDashUser'
import { IRole } from 'types/IRole'
import { IUpdatePassword } from 'types/IUpdatePassword'

class UserController {
    private removeMasks(user: IDashUser): IDashUser {
        if (user && user.cpf !== undefined && user.cpf !== null) {
            user.cpf = removeMask(user.cpf);
        }
        return user;
    }

    async getAll(filters?: IDashUserFilter): Promise<IDashUser[]> {
        const params = {}
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters && filters[key] != undefined && filters[key] !== '') {
                    params[`filter[${key}][$contains]`] = filters[key]
                }
            })
        }
        const urlParams = MapperUrlParams(params)
        const userService = new UserService()
        return await userService.getAll(urlParams)
    }

    async getById(id: string): Promise<IDashUserGet> {
        const userService = new UserService()
        return await userService.getById(id)
    }

    async update(id: string, user: IDashUser): Promise<IDashUser> {
        const userService = new UserService()
        user = this.removeMasks(user)
        return await userService.update(id, user)
    }

    async create(user: IDashUser): Promise<IDashUser> {
        const userService = new UserService()
        user = this.removeMasks(user)
        return await userService.create(user)
    }

    async getCurrentUserInfo(): Promise<IDashUserGet> {
        const userService = new UserService()
        return await userService.getCurrentUserInfo()
    }

    async getAllRoles(): Promise<{ roles: IRole[] }> {
        const userService = new UserService()
        return await userService.getAllRoles()
    }

    async updateTenant(data: { tenant: string }, id: string) {
        const userService = new UserService()
        return await userService.updateTenant(data, id)
    }

    async updatePassword(data: IUpdatePassword) {
        const userService = new UserService()
        return await userService.updatePassword(data)
    }
}

export default UserController
