import api from "../api";
import { UserCreationProps } from "./types";

export async function createUser(body : UserCreationProps){

    try {
        const res = await api.post('/users', body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}