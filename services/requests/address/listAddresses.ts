import api from "../api";
import { FiltersProps, getParamsObj } from "../utils";
import { AddressGetProps } from "./types";


export async function listAddresses(addressFilters : FiltersProps) : Promise<AddressGetProps[] | undefined>{

    const params = getParamsObj(addressFilters);

    try {
        const res = await api.get('/addresses', {
            params: params
        });
        return res.data as AddressGetProps[];
    } catch(error: any) {
        return undefined;
    }
}

// export async function listAddresses() : Promise<AddressGetProps[] | undefined>{

//     try {
//         const res = await api.get('/Address');
//         return res.data as AddressGetProps[];
//     } catch(error: any) {
//         return undefined;
//     }
// }