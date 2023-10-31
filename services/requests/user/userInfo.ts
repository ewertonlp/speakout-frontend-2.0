import api from "../api";
import { UserInfo } from "./types";

export async function userInfo() : Promise<UserInfo | undefined>{

    try {
        const res = await api.get('/users/me');
        return res.data;
    } catch(error: any) {
        return undefined;
    }
}