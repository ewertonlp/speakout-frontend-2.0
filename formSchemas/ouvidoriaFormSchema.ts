import { ISchemaForm, TypeSchemaForm } from 'types/ISchemaForm'

export const OuvidoriaFormSchema: ISchemaForm[] = [
    {
        name: 'identification',
        required: false,
        label: 'Você deseja se identificar?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Você deseja se identificar?',
            items: {
                // type: 'object',
                type: 'string',
                enum: ['Sim', 'Não'],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 12,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'email',
        required: true,
        label: 'Email',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual é o seu email?',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'relation',
        required: true,
        label: 'Qual é a sua relação com a Meta?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Qual é a sua relação com a Meta?',
            items: {
                // type: 'object',
                type: 'string',
                enum: [
                    'Colaborador da empresa',
                    'Ex colaborador da empresa',
                    'Cliente da empresa',
                    'Fornecedor / Prestador/ Credenciado da empresa',
                    'Comunidade no entorno da empresa',
                    'Outros - especificar',
                ],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'ethicCode',
        required: true,
        label: 'Qual item do código de éticas este relato está infringindo? Link Código de ética',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual item do código de éticas este relato está infringindo? Link Código de ética?',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'company',
        required: true,
        label: 'Em qual empresa você trabalha?',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Em qual empresa você trabalha?',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'complaintType',
        required: true,
        label: 'Qual o tipo de denúncia você deseja relatar?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Qual o tipo de denúncia você deseja relatar?',
            items: {
                // type: 'object',
                type: 'string',
                enum: [
                    'Assédio (Moral e/ou sexual)',
                    'Agressões físicas',
                    'Discriminação',
                    'Favorecimento de fornecedores',
                    'Favorecimento em processo de recrutamento e seleção',
                    'Favorecimento em Processo de Recrutamento e Utilização indevida de Bens e recursos da empresa',
                    'Criar/ignorar perigos ambientais ou de segurança',
                    'Subtração de bens ou dinheiro',
                    'Utilização indevida de informações privilegiadas',
                    'Vazamento de dados pessoais',
                    'Corrupção',
                    'Conflitos de interesse',
                    'Fraude',
                    'Infração aos direitos humanos e discriminação',
                    'Conduta inadequada dos nossos motoristas de trânsito',
                    'Agressão física',
                    'Conduta do colaborador',
                    'Conduta do gestor',
                    'Descumprimento de Políticas, normas, ou Procedimentos Internos',
                    'Destruição ou danos de ativos da empresa',
                    'Relações com a comunidade',
                    'Relações com o setor público',
                    'Relações com o sindicato',
                    'Trabalho infantil, escravo, ou forçado',
                    'Uso de álcool, drogas ou porte e comércio de armas',
                    'Uso indevido da marca',
                    'Uso indevido de recursos da empresa',
                    'Violação de Leis Ambientais',
                    'Outros',
                ],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'where',
        required: true,
        label: 'Onde ocorreu o incidente?',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Onde ocorreu o incidente?',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'when',
        required: true,
        label: 'Quando esse fato ocorreu?',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Quando esse fato ocorreu?',
            format: 'date',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'CustomDateField',
            autofocus: true,
        },
    },
    {
        name: 'who',
        required: true,
        label: 'Quem cometeu o incidente? Informe o nome da pessoa e, se possível, mais detalhes como o sobrenome, área e cargo',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Quem cometeu o incidente? Informe o nome da pessoa e, se possível, mais detalhes como o sobrenome, área e cargo',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'continuity',
        required: true,
        label: 'Esse fato continua ocorrendo?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Esse fato continua ocorrendo?',
            items: {
                // type: 'object',
                type: 'string',
                enum: ['Sim', 'Não', 'Talvez'],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'witnesses',
        required: true,
        label: 'Havia testemunhas?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Havia testemunhas?',
            items: {
                // type: 'object',
                type: 'string',
                enum: ['Sim', 'Não'],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 12,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'certainty',
        required: true,
        label: 'Qual o grau de certeza sobre o fato que você está denunciando?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Qual o grau de certeza sobre o fato que você está denunciando?',
            items: {
                // type: 'object',
                type: 'string',
                enum: ['Já ouvi dizer', 'Tenho a certeza', 'Tenho suspeitas'],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'file',
        required: false,
        label: 'Caso você tenha evidências sobre o fato video, foto, documento etc) faça o upload do arquivo aqui o tamanho máximo do arquivo 1GB',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Caso você tenha evidências sobre o fato video, foto, documento etc) faça o upload do arquivo aqui o tamanho máximo do arquivo 1GB',
            format: 'data-url',
        },
        uiSchema: {},
    },
]

export const identificationArray: ISchemaForm[] = [
    {
        name: 'name',
        required: true,
        label: 'Nome',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual é o seu nome?',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'role',
        required: true,
        label: 'Cargo',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual é o seu cargo?',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'phone',
        required: true,
        label: 'Telefone',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual é o seu telefone?',
        },
        uiSchema: {
            options: {
                ui: 6,
                mask: '(99) 9 9999-9999',
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'contactTime',
        required: true,
        label: 'Contato',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual é o melhor horário para contato?',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
]

export const thereWereWitnesses = {
    name: 'witnessesNames',
    required: true,
    label: 'Cite o nome das testemunhas que estavam presentes',
    props: {
        type: TypeSchemaForm.STRING,
        title: 'Cite o nome das testemunhas que estavam presentes',
    },
    uiSchema: {
        options: {
            ui: 6,
        },
        widget: 'TextWidgetWithMask',
        autofocus: true,
    },
}

export const thereWerentWitnesses = {
    name: 'moreDetails',
    required: true,
    label: 'Por favor, descreva com o maior nível de detalhes possível o que aconteceu, indicando o(s) nome(s) da(s) pessoa(s) envolvida(s) entre outras informações que você julgar pertinentes. * 0/12.000 caracteres. Escreva o máximo de detalhes possível',
    props: {
        type: TypeSchemaForm.STRING,
        title: 'Por favor, descreva com o maior nível de detalhes possível o que aconteceu, indicando o(s) nome(s) da(s) pessoa(s) envolvida(s) entre outras informações que você julgar pertinentes. * 0/12.000 caracteres. Escreva o máximo de detalhes possível',
    },
    uiSchema: {
        options: {
            ui: 6,
        },
        widget: 'CustomTextarea',
        autofocus: true,
    },
}

export const tipoDiscriminacao = {
    name: 'discriminacao',
    required: true,
    label: 'Tipo de discriminação',
    props: {
        type: TypeSchemaForm.ARRAY,
        title: 'Tipo de discriminação',
        items: {
            // type: 'object',
            type: 'string',
            enum: ['Étnica', 'Racial', 'Social', 'Sexual', 'Física', 'Outros'],
        },
        uniqueItems: true,
    },
    uiSchema: {
        options: {
            ui: 12,
        },
        widget: 'CustomSelect',
    },
}

export const tipoFavorecimentoFornecedores = {
    name: 'favorecimentoFornecedores',
    required: true,
    label: 'Tipo de favorecimento de fornecedores',
    props: {
        type: TypeSchemaForm.ARRAY,
        title: 'Tipo de favorecimento de fornecedores',
        items: {
            type: 'string',
            enum: ['Concorrência desleal', 'Suborno', 'Irregularidades financeiras', 'Outros'],
        },
        uniqueItems: true,
    },
    uiSchema: {
        options: {
            ui: 12,
        },
        widget: 'CustomSelect',
    },
}

export const tipoUtilizacaoIndevidaBens = {
    name: 'tipoUtilizacaoIndevidaBens',
    required: true,
    label: 'Tipo de utilização indevida de bens e recursos da empresa',
    props: {
        type: TypeSchemaForm.ARRAY,
        title: 'Tipo de utilização indevida de bens e recursos da empresa',
        items: {
            type: 'string',
            enum: ['Depreciação', 'Utilização indevida do patrimônio'],
        },
        uniqueItems: true,
    },
    uiSchema: {
        options: {
            ui: 12,
        },
        widget: 'CustomSelect',
    },
}

export const tipoSubtracaoBensDinheiro = {
    name: 'tipoSubtracaoBensDinheiro',
    required: true,
    label: 'Tipo de subtração de bens ou dinheiro',
    props: {
        type: TypeSchemaForm.ARRAY,
        title: 'Tipo de subtração de bens ou dinheiro',
        items: {
            type: 'string',
            enum: ['Pessoais', 'Da empresa'],
        },
        uniqueItems: true,
    },
    uiSchema: {
        options: {
            ui: 12,
        },
        widget: 'CustomSelect',
    },
}
