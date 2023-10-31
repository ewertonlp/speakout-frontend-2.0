import api from "../api";
import { DeliverymanCreationProps } from "./types";

export async function createDeliveryman(body : DeliverymanCreationProps){

    try {
        const res = await api.post('/couriers', body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}