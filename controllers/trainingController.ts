import { TrainingService } from 'services/trainingService'
import { ITraining } from 'types/ITraining'

export class TrainingController {
    async create(data: ITraining) {
        const trainingService = new TrainingService()
        await trainingService.create(data)
    }
    async update(data: ITraining, id: string) {
        const trainingService = new TrainingService()
        await trainingService.update(data, id)
    }
    async getById(id: string): Promise<{ data: ITraining }> {
        const trainingService = new TrainingService()
        const response = await trainingService.getById(id)
        console.log('passou aqui')
        return {
            data: response,
        }
    }
    async getByStatus(status: number): Promise<{ data: ITraining }> {
        const trainingService = new TrainingService()
        const response = await trainingService.getByStatus(status)
        return {
            data: response,
        }
    }
    async getAll(): Promise<{ data: ITraining[] }> {
        const trainingService = new TrainingService()
        const response = await trainingService.getAll()
        return {
            data: response,
        }
    }
}
