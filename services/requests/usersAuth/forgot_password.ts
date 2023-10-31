import api from "../api";


export async function forgotPassword(body : {email: string}) : Promise< {ok: boolean} | undefined>{
    try {
        const res = await api.post('/auth/forgot-password', body);
        return res.data;
    } catch(error: any) {
        return undefined;
    }
}