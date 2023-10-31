import api from "../api";
import { DeliverymanCreationProps } from "./types";

export async function editDeliveryman(id : string, body : DeliverymanCreationProps){

    try {
        const res = await api.put(`/couriers/${id}`, body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}