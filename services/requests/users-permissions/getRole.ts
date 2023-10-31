import api from "../api";

export async function getRole(id: string){
    try {
        const res = await api.get(`/users-permissions/roles/${id}`);
        return res.data;
    } catch (error) {
        return undefined;
    }
}