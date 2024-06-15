import { IImageUpload } from "./IImageUpload";

export type IComplaint = {
    tenant: string
    // response: Record<string, unknown>
    response: {
        [key: string]: any; // Alterando para um tipo genérico para os valores do objeto
    }
    email: string
    media?: IImageUpload[]
    protocol?: string
}
