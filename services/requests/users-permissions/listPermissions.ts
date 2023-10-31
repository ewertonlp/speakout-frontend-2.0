import api from "../api";

export async function listPermissions(){
    try {
        const res = await api.get('/users-permissions/permissions');
        return res.data;
    } catch (error) {
        return undefined;
    }
}