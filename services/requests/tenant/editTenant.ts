import api from "../api";
import { TenantCreationProps } from "./types";

export async function editTenant(id : string, body : TenantCreationProps){

    try {
        const res = await api.put(`/tenants/${id}`, body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}