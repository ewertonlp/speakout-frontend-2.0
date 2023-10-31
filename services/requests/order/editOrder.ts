import api from "../api";
import { OrderCreationProps } from "./types";

export async function editOrder(id : string, body : OrderCreationProps){

    try {
        const res = await api.put(`/orders/${id}`, body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}