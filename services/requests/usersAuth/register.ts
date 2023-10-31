import api from "../api";
import { LoginRegisterResponseProps, RegisterProps } from "./types";


export async function register(body : RegisterProps) : Promise<LoginRegisterResponseProps | undefined>{
    try {
        const res = await api.post('/auth/local/register', body);
        return res.data as LoginRegisterResponseProps;
    } catch(error: any) {
        return undefined;
    }
}