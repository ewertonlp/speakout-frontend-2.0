import api from "../api";
import { UserGetProps } from "./types";

export async function getUser(id : string) : Promise<UserGetProps | undefined>{

    try {
        const res = await api.get(`/users/${id}`);
        return res.data as UserGetProps;
    } catch(error: any) {
        return undefined;
    }
}