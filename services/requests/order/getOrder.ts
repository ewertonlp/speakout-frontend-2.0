import api from "../api";
import { OrderGetProps } from "./types";

export async function getOrder(id : string) : Promise<OrderGetProps | undefined>{

    try {
        const res = await api.get(`/orders/${id}`);
        return res.data as OrderGetProps;
    } catch(error: any) {
        return undefined;
    }
}