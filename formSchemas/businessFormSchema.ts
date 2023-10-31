import { AddressFormSchema } from 'formSchemas/addressFormSchema'
import { ApolloFormSchemaGroup, ApolloFormSchemaItem } from 'src/components'
import { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'

const groups: ApolloFormSchemaGroup[] = [
    {
        name: 'Informações:',
        key: 'information',
        type: 'label',
        variant: 'h5',
        visible: true,
    },
]
const BusinessFormSchema: ApolloFormSchemaItem[] = [
    {
        name: 'id',
        required: false,
        label: 'id',
        ui: { grid: 12 },
        componenttype: ApolloFormSchemaComponentType.HIDDEN,
    },
    {
        name: 'cnpj',
        required: true,
        label: 'CNPJ',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        mask: '99.999.999/9999-99',
        ui: { grid: 6 },
    },
    {
        name: 'reasonName',
        required: true,
        label: 'Razão Social',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'fantasyName',
        required: false,
        label: 'Nome fantasia',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'contactName',
        required: false,
        label: 'Nome do contato',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'contactEmail',
        required: false,
        label: 'Email de contato',
        componenttype: ApolloFormSchemaComponentType.TEXT,

        ui: { grid: 6 },
    },
    {
        name: 'contactPhone',
        required: false,
        label: 'Celular de contato',
        mask: '(99)99999-9999',
        ui: { grid: 6 },
        componenttype: ApolloFormSchemaComponentType.TEXT,
    },
    ...AddressFormSchema,
]

const BusinessFilterFormSchema: ApolloFormSchemaItem[] = [
    {
        name: 'cnpj',
        required: false,
        label: 'CNPJ',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        mask: '99.999.999/9999-99',
        ui: { grid: 4 },
    },
    {
        name: 'reasonName',
        required: false,
        label: 'Razão Social',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 4 },
    },
    {
        name: 'status',
        required: false,
        label: 'Status',
        componenttype: ApolloFormSchemaComponentType.RADIOGROUP,
        options: [
            { value: 'true', label: 'Ativo(a)' },
            { value: 'false', label: 'Inativo(a)' },
        ],
        ui: { grid: 4 },
    },
]

export { BusinessFilterFormSchema, BusinessFormSchema, groups }
