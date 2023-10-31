import api from "../api";
import { RoleCreateProps } from "./types";


export async function editRole(id : string, body: RoleCreateProps){
    try {
        const res = await api.put(`/users-permissions/roles/${id}`, body);
        return res;
    } catch (error) {
        return undefined;
    }
}