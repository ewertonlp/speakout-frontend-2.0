import api from "../api";
import { AddressCreationProps } from "./types";


export async function editAddress(id : string, body : AddressCreationProps){

    try {
        const res = await api.put(`/addresses/${id}`, body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}