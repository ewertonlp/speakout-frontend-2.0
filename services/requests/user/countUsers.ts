import api from "../api";

export async function countUsers() : Promise<number | undefined>{

    try {
        const res = await api.get('/users/count');
        return res.data;
    } catch(error: any) {
        return undefined;
    }
}