import api from "../api";
import { TenantCreationProps } from "./types";

export async function createTenant(body : TenantCreationProps){

    try {
        const res = await api.post('/tenants', body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}