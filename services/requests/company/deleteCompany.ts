import api from "../api";

export async function deleteCompany(id : string){

    try {
        const res = await api.delete(`/businesses/${id}`);
        return res;
    } catch(error: any) {
        return undefined;
    }
}