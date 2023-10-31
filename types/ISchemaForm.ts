export enum TypeSchemaForm {
    'BOOLEAN' = 'boolean',
    'STRING' = 'string',
    'NUMBER' = 'number',
    'ARRAY' = 'array',
}

type IPropertiesSchema = {
    type: TypeSchemaForm
    title?: string
    classNames?: string
    items?: any
    enum?: any
    oneOf?: any
    uniqueItems?: boolean
    format?: string
}

type IOptionsUISchema = {
    mask?: string
    ui: number
    items?: string[]
}

type IUISchema = {
    autofocus?: boolean
    placeholder?: string
    options?: IOptionsUISchema
    widget?: string
}

export type ISchemaForm = {
    name: string
    label: string
    required: boolean
    props: IPropertiesSchema
    uiSchema: IUISchema
}
