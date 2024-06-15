import { IComplaint } from 'types/IComplaint'
import { IComplaintStatus } from 'types/IComplaintHistory'
import { IImageUpload } from 'types/IImageUpload'
import api from './api'

export default class ComplaintService {
    async sendComplaint(data: IComplaint): Promise<IComplaint> {
        try {
            
            const response = await api.post(`api/posts`, { data: data });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar queixa:', error.response || error.message);
            throw error;
        }
    }

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

    async getHistoryOfComplaint(protocol: string): Promise<IComplaintStatus> {
        return await api.get(`api/posthistorybyprotocol/${protocol}`)
    }
}
