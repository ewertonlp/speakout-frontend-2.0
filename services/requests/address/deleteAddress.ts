import api from "../api";

export async function deleteAddress(id : string){
    try {
        const res = await api.delete(`/addresses/${id}`);
        return res;
    } catch(error: any) {
        return undefined;
    }
}