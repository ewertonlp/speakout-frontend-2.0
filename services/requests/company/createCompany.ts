import api from "../api";
import { CompanyCreationProps } from "./types";

export async function createCompany(body : CompanyCreationProps){

    try {
        const res = await api.post('/businesses', {data: body});
        return res;
    } catch(error: any) {
        return undefined;
    }
}