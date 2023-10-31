import { ActionService } from 'services/actionService'

export class ActionController {
    async create(data: any) {
        const actionService = new ActionService()
        await actionService.create(data)
    }

    async update(data: any, id: string) {
        const actionService = new ActionService()
        return await actionService.update(data, id)
    }
}
