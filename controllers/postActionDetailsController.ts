import { PostActionDetailsService } from 'services/postActionDetailsService'
import { IPostActionDetails } from 'types/IPostActionDetails'

export class PostActionDetailsController {
    async getAll(): Promise<IPostActionDetails[]> {
        const postActionDetailsService = new PostActionDetailsService()
        const response = await postActionDetailsService.getAll()
        return response.data
    }

    async getById(id: string): Promise<IPostActionDetails> {
        const postActionDetailsService = new PostActionDetailsService()
        const response = await postActionDetailsService.getById(id)
        return response.data
    }

    async update(data: IPostActionDetails, id: string) {
        const postActionDetailsService = new PostActionDetailsService()
        await postActionDetailsService.update(data, id)
    }

    async delete(id: string) {
        const postActionDetailsService = new PostActionDetailsService()
        await postActionDetailsService.delete(id)
    }

    async create(data: IPostActionDetails) {
        const postActionDetailsService = new PostActionDetailsService()
        await postActionDetailsService.create(data)
    }
}
