import { PostActionService } from 'services/postActionService'
import { IPostAction, IPostActionGet } from 'types/IPostAction'

export class PostActionController {
    async getAll(): Promise<IPostActionGet[]> {
        const postActionService = new PostActionService()
        return await postActionService.getAll()
    }

    async getById(id: string): Promise<IPostActionGet> {
        const postActionService = new PostActionService()
        return await postActionService.getById(id)
    }

    async update(data: IPostAction, id: string) {
        const postActionService = new PostActionService()
        await postActionService.update(data, id)
    }

    async create(data: IPostAction) {
        const postActionService = new PostActionService()
        await postActionService.create(data)
    }
}
