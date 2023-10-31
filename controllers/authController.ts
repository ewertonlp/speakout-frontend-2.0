import Cookies from 'js-cookie'
import AuthService from 'services/authService'
import { UserInfo } from 'services/requests/user/types'
import { ILogin, ILoginForgotPassword, ILoginForm, INewPassword, IRegisterForm } from 'types/IAuth'

class AuthController {
    keyUser = '@latlong/user'

    async login(data: ILoginForm): Promise<ILogin> {
        try {
            const authService = new AuthService()
            const response = await authService.login(data)
            if (!response.jwt) {
                throw new Error('Exception: Access Token undefined')
            }
            this.setUser(response)
            location.href = '/'
            return response
        } catch (error) {
            throw error
        }
    }

    async register(data: IRegisterForm): Promise<ILogin> {
        try {
            const authService = new AuthService()
            const response = await authService.register(data)
            if (!response.jwt) {
                throw new Error('Exception: Access Token undefined')
            }
            this.setUser(response)
            location.href = '/'
            return response
        } catch (error) {
            throw error
        }
    }

    setUser(data: ILogin) {
        Cookies.set('token', data.jwt, {
            expires: 2,
        })
        localStorage.setItem(this.keyUser, JSON.stringify(data.user))
    }

    getUser(): UserInfo | undefined {
        const user = localStorage.getItem(this.keyUser)
        const token = Cookies.get('token')
        if (!user || !token) {
            this.logout()
            return
        }
        return JSON.parse(user)
    }

    logout(): void {
        Cookies.remove('token')
        localStorage.clear()
        location.href = '/login'
    }

    async sendPasswordRecoveryEmail(data: ILoginForgotPassword) {
        const authService = new AuthService()
        return await authService.forgotPassword(data)
    }

    async changePassword(data: INewPassword) {
        const authService = new AuthService()
        return await authService.resetPassword(data)
    }
}

export default AuthController
