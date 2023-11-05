import api from './api'

export class ReportService {
    urlBaseService

    constructor() {
        this.urlBaseService = '/report'
    }

    async getPosts(urlParams: string): Promise<number> {
        return await api.get(`${this.urlBaseService}/posts?${urlParams}`)
    }
}
