import api from "../api";
import { FiltersProps, getParamsObj } from "../utils";

export async function listDeliverymans(filters?: FiltersProps){
 
    let params = {};
    if(filters !== undefined){
        params = getParamsObj(filters);
    }

    try {
        const res = await api.get('/couriers',{
            params: params
        });
        return res.data;
    } catch(error: any) {
        return undefined;
    }
}