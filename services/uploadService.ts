import { IImageUpload } from 'types/IImageUpload'
import api from './api'

export class UploadService {
    async uploadFile(data: File): Promise<IImageUpload[]> {
        return await api.post(
            `api/upload`,
            { files: data },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
    }

    async deleteFile(id: string) {
        return await api.delete(`api/upload/files/${id}`)
    }

    async getById(id: string): Promise<IImageUpload> {
        return await api.get(`api/upload/files/${id}`)
    }

    async getAll(): Promise<IImageUpload[]> {
        return await api.get('api/upload/files')
    }
}
