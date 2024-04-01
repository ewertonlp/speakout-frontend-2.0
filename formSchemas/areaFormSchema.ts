import { ApolloFormSchemaItem } from 'src/components'
import { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'

export const AreaFormSchema: ApolloFormSchemaItem[] = [
    {
        name: 'id',
        required: false,
        label: 'id',
        componenttype: ApolloFormSchemaComponentType.HIDDEN,
        ui: { grid: 12 },
    },
    {
        name: 'description',
        required: true,
        label: 'Insira o nome da área que deseja cadastrar',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 12 },
        
    },
]
