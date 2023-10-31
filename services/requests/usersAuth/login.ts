import api from "../api";
import { LoginProps, LoginRegisterResponseProps } from "./types";


export async function login(body : LoginProps) : Promise<LoginRegisterResponseProps | undefined>{
    try {
        const res = await api.post('/auth/local', body);
        return res.data as LoginRegisterResponseProps;
    } catch(error: any) {
        return error;
    }
}