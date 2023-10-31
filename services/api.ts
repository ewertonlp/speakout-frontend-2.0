import axios, { AxiosInstance } from 'axios'
import AuthController from 'controllers/authController'
import Cookies from 'js-cookie'
import { BASE_APP } from 'src/config'

// ----------------------------------------------------------------------

const config = {
    baseURL: BASE_APP.base_url,
}

const instance: AxiosInstance = axios.create(config)

instance.interceptors.request.use(
    function (config) {
        const token = Cookies.get('token')
        if (token !== undefined && config.headers !== undefined) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        if (error.response.status == 401 || error.response.status == 403) {
            new AuthController().logout()
        }
        return Promise.reject(error)
    },
)

export default instance
