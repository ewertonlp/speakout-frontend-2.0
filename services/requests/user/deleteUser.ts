import api from "../api";

export async function deleteUser(id : string){

    try {
        const res = await api.delete(`/users/${id}`);
        return res;
    } catch(error: any) {
        return undefined;
    }
}