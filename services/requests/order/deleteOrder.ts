import api from "../api";

export async function deleteOrder(id : string){

    try {
        const res = await api.delete(`/orders/${id}`);
        return res;
    } catch(error: any) {
        return undefined;
    }
}