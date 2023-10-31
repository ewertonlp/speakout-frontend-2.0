import api from "../api";

export async function deleteDeliveryman(id : string){

    try {
        const res = await api.delete(`/couriers/${id}`);
        return res;
    } catch(error: any) {
        return undefined;
    }
}