import api from "../api";
import { CompanyGetProps } from "./types";

export async function getCompany(id : string){

    try {
        const res = await api.get(`/businesses/${id}`);
        return res.data as CompanyGetProps;;
    } catch(error: any) {
        return undefined;
    }
}