export type TableSchemaColumnProps = {
    id: string
    label?: string
    align?: 'left' | 'right' | 'center'
    width?: number
    minWidth?: number
    renderCell?: (params: any) => any
    valueGetter?: (params: any) => string
}
