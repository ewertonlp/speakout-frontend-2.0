import { PostHistoriesService } from 'services/postHistoriesService'
import { IPostHistoryCreate } from 'types/IPostHistory'

export class PostHistoriesController {
    async sendNewComment(data: IPostHistoryCreate) {
        const postHistoriesService = new PostHistoriesService()
        await postHistoriesService.sendNewComment(data)
    }
}
