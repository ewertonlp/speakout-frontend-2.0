import api from "../api";
import { FiltersProps, getParamsObj } from "../utils";
import { OrderGetProps } from "./types";

export async function listOrders(filters : FiltersProps) : Promise<OrderGetProps[] | undefined>{

    const params = getParamsObj(filters);

    try {
        const res = await api.get('/orders', {
            params: params
        });
        return res.data as OrderGetProps[];
    } catch(error: any) {
        return undefined;
    }
}