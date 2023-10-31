import api from "../api";
import { DeliverymanGetProps } from "./types";

export async function getDeliveryman(id : string) : Promise<DeliverymanGetProps | undefined>{

    try {
        const res = await api.get(`/couriers/${id}`);
        return res.data as DeliverymanGetProps;
    } catch(error: any) {
        return undefined;
    }
}