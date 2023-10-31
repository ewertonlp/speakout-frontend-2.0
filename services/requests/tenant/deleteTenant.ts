import api from "../api";

export async function deleteTenant(id : string){

    try {
        const res = await api.delete(`/tenants/${id}`);
        return res;
    } catch(error: any) {
        return undefined;
    }
}