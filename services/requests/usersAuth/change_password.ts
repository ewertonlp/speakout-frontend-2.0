import api from "../api";
import { ChangePasswordProps, LoginRegisterResponseProps } from "./types";



export async function changePassword(body : ChangePasswordProps) : Promise<LoginRegisterResponseProps | undefined>{
    try {
        const res = await api.post('/auth/change-password', body);
        return res.data;
    } catch(error: any) {
        return undefined;
    }
}