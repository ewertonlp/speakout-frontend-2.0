import api from "../api";
import { FiltersProps, getParamsObj } from "../utils";

export async function listCompanies(filters?: FiltersProps){

    let params = {};
    if(filters != undefined){
        params = getParamsObj(filters);
    }

    try {
        const res = await api.get('/businesses' , {
            params: params
        });
        return res.data;
    } catch(error: any) {
        console.log(error)
        return undefined;
    }
}