import { IPostHistoryCreate } from 'types/IPostHistory'
import api from './api'

export class PostHistoriesService {
    urlBaseService
    constructor() {
        this.urlBaseService = 'api/posthistories'
    }

    async sendNewComment(data: IPostHistoryCreate) {
        await api.post(this.urlBaseService, { data: data })
    }
}
