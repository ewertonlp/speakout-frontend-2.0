import api from "../api";
import { LoginRegisterResponseProps, ResetPasswordProps } from "./types";



export async function resetPassword(body : ResetPasswordProps) : Promise<LoginRegisterResponseProps | undefined>{
    try {
        const res = await api.post('/auth/reset-password', body);
        return res.data;
    } catch(error: any) {
        return undefined;
    }
}