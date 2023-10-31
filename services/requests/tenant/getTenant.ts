import api from "../api";
import { TenantGetProps } from "./types";

export async function getTenant(id : string) : Promise<TenantGetProps | undefined>{

    try {
        const res = await api.get(`/tenants/${id}`);
        return res.data as TenantGetProps;
    } catch(error: any) {
        return undefined;
    }
}