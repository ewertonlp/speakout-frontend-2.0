import api from "../api";
import { RoleCreateProps } from "./types";


export async function createRole(body: RoleCreateProps){
    try {
        const res = await api.post('/users-permissions/roles', body);
        return res;
    } catch (error) {
        return undefined
    }
}