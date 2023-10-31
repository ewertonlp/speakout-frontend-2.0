import {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaItem,
} from '../ApolloForm.component'

export const getDefaultValues = (schema: ApolloFormSchemaItem[]): any =>
    schema.reduce(
        (acc: ApolloFormSchemaItem, val: ApolloFormSchemaItem): any => {
            let defaultValue

            switch (val.componenttype) {
                case ApolloFormSchemaComponentType.CHECKBOX:
                    defaultValue = false
                    break
                case ApolloFormSchemaComponentType.CURRENCY:
                    defaultValue = 0
                    break
                default:
                    defaultValue = ''
            }
            return { ...acc, [val.name]: val.defaultValue || defaultValue }
        },
        {} as any,
    )
