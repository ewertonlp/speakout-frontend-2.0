import { IPostClosed } from 'types/IPostClosed'
import { IPostListing } from 'types/IPostListing'
import api from './api'

export class PostService {
    urlBaseService

    constructor() {
        this.urlBaseService = '/posts'
    }

    async getAll(filters: string): Promise<IPostListing[]> {
        return await api.get(`${this.urlBaseService}?${filters}`)
    }

    async getById(id: string): Promise<IPostListing> {
        return api.get(`${this.urlBaseService}/${id}`)
    }

    async update(data: any, id: string): Promise<IPostListing> {
        const response = await api.put(`${this.urlBaseService}/${id}`, { data: data })
        return response.data
    }

    async closePost(data: IPostClosed): Promise<IPostClosed> {
        const response = await api.post(`api/postcloseds`, { data })
        return response.data
    }

    async findByPostId(postId: string): Promise<IPostClosed> {
        return await api.get(`api/postcloseds/findByPost/${postId}`)
    }
}
