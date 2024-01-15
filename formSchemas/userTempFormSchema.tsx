import { ApolloFormSchemaItem } from 'src/components'
import { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'

export const UserTempFormSchema: ApolloFormSchemaItem[] = [
    {
        name: 'id',
        required: false,
        label: 'id',
        componenttype: ApolloFormSchemaComponentType.HIDDEN,
        ui: { grid: 12 },
    },

    {
        name: 'fullname',
        required: true,
        label: 'Nome Completo',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'username',
        required: true,
        label: 'Nome de usuário',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'email',
        required: true,
        label: 'Email',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 12 },
    },
]

export const UserFiltersFormSchema: ApolloFormSchemaItem[] = [
    {
        name: 'fullname',
        required: false,
        label: 'Nome',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 4 },
    },
    {
        name: 'email',
        required: false,
        label: 'Email',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 4 },
    },
]
