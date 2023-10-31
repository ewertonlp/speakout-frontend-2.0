import AddressService from "services/addressService";
import { IAddress } from "types/IAddress";



class AddressController{

    private regexNumber(value: string){
        return value.replace(/[^0-9]/g, '');
    }
    
    async getCep(cep: string) : Promise<IAddress>{
        const unmaskedCep = this.regexNumber(cep)
        const addressService = new AddressService();
        return addressService.getCep(unmaskedCep);
    }
};

export default AddressController