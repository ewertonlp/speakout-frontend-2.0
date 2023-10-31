import { IAddress } from 'types/IAddress'
import instance from './api'

class AddressService {
    async getCep(cep: string): Promise<IAddress> {
        const res: IAddress = await instance.get(`/cep/${cep}`)
        return res
    }
}

export default AddressService
