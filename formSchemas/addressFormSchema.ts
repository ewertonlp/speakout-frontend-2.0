import { ApolloFormSchemaItem } from 'src/components'
import { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'

const AddressFormSchema: ApolloFormSchemaItem[] = [
    {
        name: 'cep',
        required: true,
        label: 'Cep',
        mask: '99.999-999',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 12 },
        onChange(e) {},
    },
    {
        name: 'street',
        required: true,
        label: 'Rua',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'number',
        required: true,
        label: 'Número',
        ui: { grid: 2 },
        componenttype: ApolloFormSchemaComponentType.TEXT,
    },
    {
        name: 'complement',
        required: false,
        label: 'Complemento',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 4 },
    },
    {
        name: 'district',
        required: true,
        label: 'Bairro',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'city',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        required: true,
        label: 'Cidade',
        ui: { grid: 6 },
    },
    {
        name: 'uf',
        required: true,
        label: 'Estado U.F',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
]

export { AddressFormSchema }
