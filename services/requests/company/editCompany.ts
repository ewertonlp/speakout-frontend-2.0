import api from "../api";
import { CompanyCreationProps } from "./types";

export async function editCompany(id : string, body : CompanyCreationProps){

    try {
        const res = await api.put(`/businesses/${id}`, {data: body});
        return res;
    } catch(error: any) {
        return undefined;
    }
}