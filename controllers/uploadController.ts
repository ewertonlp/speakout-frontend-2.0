import { UploadService } from 'services/uploadService'
import { IImageUpload } from 'types/IImageUpload'

export class UploadController {
    async uploadFile(data: File): Promise<IImageUpload[]> {
        const uploadService = new UploadService()
        return await uploadService.uploadFile(data)
    }

    async deleteFile(id: string) {
        const uploadService = new UploadService()
        await uploadService.deleteFile(id)
    }

    async getById(id: string) {
        const uploadService = new UploadService()
        return await uploadService.getById(id)
    }

    async getAll() {
        const uploadService = new UploadService()
        return await uploadService.getAll()
    }
}
