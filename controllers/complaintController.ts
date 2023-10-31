import ComplaintService from 'services/complaintService'
import { IComplaint } from 'types/IComplaint'
import { IComplaintStatus } from 'types/IComplaintHistory'
import { IImageUpload } from 'types/IImageUpload'

export default class ComplaintController {
    async sendComplaint(data: IComplaint) {
        const complaintService = new ComplaintService()
        return await complaintService.sendComplaint(data)
    }

    async uploadFile(data: File): Promise<IImageUpload[]> {
        const complaintService = new ComplaintService()
        return await complaintService.uploadFile(data)
    }

    async getHistoryOfComplaint(protocol: string): Promise<IComplaintStatus> {
        const complaintService = new ComplaintService()
        return await complaintService.getHistoryOfComplaint(protocol)
    }
}
