import api from "../api";

export async function listRoles(){
    try {
        const res = await api.get(`/users-permissions/roles`);
        return res.data;
    } catch (error) {
        return undefined;
    }
}