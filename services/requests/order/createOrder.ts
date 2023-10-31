import api from "../api";
import { OrderGetProps } from "./types";

export async function createOrder(body : OrderGetProps){

    try {
        const res = await api.post('/orders', body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}