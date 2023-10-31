import api from "../api";
import { AddressGetProps } from "./types";


export async function getAddress(id : string) : Promise<AddressGetProps | undefined>{

    try {
        const res = await api.get(`/addresses/${id}`);
        return res.data as AddressGetProps;
    } catch(error: any) {
        return undefined;
    }
}