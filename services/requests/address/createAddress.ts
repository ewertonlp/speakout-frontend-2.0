import api from "../api";
import { AddressCreationProps } from "./types";

export async function createAddress(body : AddressCreationProps){

    try {
        const res = await api.post('/addresses', body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}