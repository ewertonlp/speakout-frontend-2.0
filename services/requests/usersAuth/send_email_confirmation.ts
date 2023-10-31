import api from "../api";


export async function send_email_confirmation(body : {email: string}) : Promise<{email: string; sent: boolean} | undefined>{
    try {
        const res = await api.post('/auth/send-email-confirmation', body);
        return res.data;
    } catch(error: any) {
        return undefined;
    }
}