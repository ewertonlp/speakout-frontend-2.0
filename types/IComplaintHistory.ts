import { IMedia } from './IMedia'
import { IPostHistory } from './IPostHistory'

export type IComplaintStatus = {
    id: string
    response: {
        nome: string
        cargo: string
        email: string
        'especificar-tipo-relacao': string
        empresa: string
        relacao: string
        infracao: string
        telefone: string
        evidencia: string
        'area-atuacao': string
        identificacao: string
        'tipo-denuncia': { group: string; label: string; value: string }
        'data-ocorrencia': string
        'autor-ocorrencia': string
        'local-ocorrencia': string
        'recorrencia-ocorrencia': string
        'testemunhas-ocorrencia': string
        'grau-de-certeza-denuncia': string
        'especificar-tipo-denuncia': string
        'nao-testemunhas-ocorrencia': string
        'sim-testemunhas-ocorrencia': string
    }
    protocol: string
    email: string
    createdAt: string
    updatedAt: string
    posthistories: IPostHistory[]
    media: IMedia[]
}
