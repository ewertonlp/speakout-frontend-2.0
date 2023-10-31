import api from "../api";
import { FiltersProps, getParamsObj } from "../utils";
import { TenantGetProps } from "./types";

export async function listTenants(filters : FiltersProps) : Promise<TenantGetProps[] | undefined>{

    const params = getParamsObj(filters);

    try {
        const res = await api.get('/tenants', {
            params: params
        });
        return res.data as TenantGetProps[];
    } catch(error: any) {
        return undefined;
    }
}