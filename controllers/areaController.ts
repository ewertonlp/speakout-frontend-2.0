import { AreaService } from 'services/areaService'
import { IArea } from 'types/IArea'

export class AreaController {
    async create(data: IArea) {
        const areaService = new AreaService()
        await areaService.create(data)
    }
    async update(data: IArea, id: string) {
        const areaService = new AreaService()
        await areaService.update(data, id)
    }
    async getById(id: string): Promise<{ data: IArea }> {
        const areaService = new AreaService()
        const response = await areaService.getById(id)
        return {
            data: response,
        }
    }
    async getAll(): Promise<{ data: IArea[] }> {
        const areaService = new AreaService()
        const response = await areaService.getAll()
        return {
            data: response,
        }
    }
}
