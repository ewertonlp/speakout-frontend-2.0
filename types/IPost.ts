export type IPost = {
    id: string
    response: {
        nome: string
        cargo: string
        email: string
        empresa: string
        relacao: string
        infracao: string
        telefone: string
        evidencia: string
        'area-atuacao': string
        'tipo-denuncia': {
            group: string
            label: string
            value: string
        }
        'data-ocorrencia': string
        'horario-contato': string
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
    sensibilidade: string
    status: string
    closedate: string
}
