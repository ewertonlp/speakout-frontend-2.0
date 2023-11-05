import api from './api'
import { ILogin, ILoginForgotPassword, ILoginForm, INewPassword, IRegisterForm } from 'types/IAuth'

class AuthService {
    urlBaseService

    constructor() {
        this.urlBaseService = '/auth'
    }

    async login(data: ILoginForm): Promise<ILogin> {
        return await api.post(`${this.urlBaseService}/local`, data)
    }

    async register(data: IRegisterForm): Promise<ILogin> {
        return await api.post(`${this.urlBaseService}/local/register`, data)
    }

    async forgotPassword(data: ILoginForgotPassword): Promise<{ ok: boolean } | undefined> {
        return await api.post(`${this.urlBaseService}/forgot-password`, data)
    }

    async resetPassword(data: INewPassword): Promise<{ ok: boolean } | undefined> {
        return await api.post(`${this.urlBaseService}/reset-password`, data)
    }
}

export default AuthService
