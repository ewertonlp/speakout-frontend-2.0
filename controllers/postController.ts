import moment from 'moment'
import { PostService } from 'services/postService'
import { ReportService } from 'services/reportService'
import MapperUrlParams from 'src/utils/mapperUrlParams'
import { IDashUserGet } from 'types/IDashUser'
import { IPostClosed } from 'types/IPostClosed'
import { IPostListing, IPostListingFilter } from 'types/IPostListing'

export class PostController {
    async getAll(filters?: IPostListingFilter): Promise<IPostListing[]> {
        const params = {}

        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters && filters[key] != undefined && filters[key] !== '') {
                    urlParams[`filter[${key}][$eq]`] = filters[key]
                }
            })
        }
        const urlParams = MapperUrlParams(params)
        const postService = new PostService()
        return postService.getAll(urlParams)
    }

    async getAllYear(): Promise<number> {
        const startDate = new Date(new Date().getFullYear(), 0, 1)
        const finalDate = new Date(startDate.getFullYear(), new Date().getMonth() + 1, 0)

        const params = {
            'filter[createdAt][$gte]': moment(startDate).format('YYYY-MM-DD'),
            'filter[createdAt][$lte]': moment(finalDate).format('YYYY-MM-DD'),
        }

        const urlParams = MapperUrlParams(params)
        const postService = new ReportService()
        return postService.getPosts(urlParams)
    }

    async getAllMonth(): Promise<number> {
        const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        const finalDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
        const params = {
            'filter[createdAt][$gte]': moment(startDate).format('YYYY-MM-DD'),
            'filter[createdAt][$lte]': moment(finalDate).format('YYYY-MM-DD'),
        }
        const urlParams = MapperUrlParams(params)
        const postService = new ReportService()
        return postService.getPosts(urlParams)
    }

    async getAllEmProgresso(): Promise<number> {
        const params = {
            'filter[status][$eq]': 'em_progresso',
        }
        const urlParams = MapperUrlParams(params)
        const postService = new ReportService()
        return postService.getPosts(urlParams)
    }

    async getAllConcluidoProcedente(): Promise<number> {
        const params = {
            'filter[status][$eq]': 'concluido_procedente',
        }
        const urlParams = MapperUrlParams(params)
        const postService = new ReportService()
        return postService.getPosts(urlParams)
    }

    async getAllConcluidoImprocedente(): Promise<number> {
        const params = {
            'filter[status][$eq]': 'concluido_improcedente',
        }
        const urlParams = MapperUrlParams(params)
        const postService = new ReportService()
        return postService.getPosts(urlParams)
    }

    async getAllNovo(): Promise<number> {
        const params = {
            'filter[status][$eq]': 'novo',
        }
        const urlParams = MapperUrlParams(params)
        const postService = new ReportService()
        return postService.getPosts(urlParams)
    }

    async getById(id: string): Promise<{ data: IPostListing }> {
        const postService = new PostService()
        const data = await postService.getById(id)
        return { data }
    }

    async update(data: any, id: string): Promise<IPostListing> {
        const postService = new PostService()
        const updatedPost = await postService.update(data, id)
        return updatedPost
    }

    async createPostClosed(data: IPostClosed): Promise<IPostClosed> {
        const postService = new PostService()
        const response = await postService.closePost(data)
        return response
    }

    async getPostClosedByPostId(postId: string): Promise<IPostClosed> {
        const postService = new PostService()
        const response = await postService.findByPostId(postId)
        return response
    }

    async deletePostClosedByCommentId(commentId: string): Promise<IPostClosed> {
        const postService = new PostService()
        const response = await postService.deletePostClosedByCommentId(commentId)
        return response
    }

    async deletePost(postId: string): Promise<IPostListing> {
        const postService = new PostService()
        const deletePost = await postService.deletePost(postId)
        return deletePost
    }

    async sendEmail(email: IDashUserGet ): Promise<IPostListing> {
        const postService = new PostService()
        const response = await postService.sendEmail(email)    
        return response
    }
}
