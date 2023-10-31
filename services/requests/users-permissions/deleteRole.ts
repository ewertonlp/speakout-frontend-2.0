import api from "../api";

export async function deleteRole(id: string){
    try {
        const res = api.delete(`/users-permissions/roles/${id}`);
        return res;
    } catch (error) {
        return undefined;
    }
}