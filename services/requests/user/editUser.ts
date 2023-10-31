import api from "../api";
import { UserCreationProps } from "./types";

export async function editUser(id : string, body : UserCreationProps){

    try {
        const res = await api.put(`/users/${id}`, body);
        return res;
    } catch(error: any) {
        return undefined;
    }
}