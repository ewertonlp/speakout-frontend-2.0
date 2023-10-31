import api from '../api'
import { FiltersProps, getParamsObj } from '../utils'

export async function listUsers(filters?: FiltersProps) {
    let params = {}
    if (filters !== undefined) {
        params = getParamsObj(filters)
    }

    try {
        const res = await api.get('/users', {
            params: params,
        })
        return res.data
    } catch (error: any) {
        return undefined
    }
}
