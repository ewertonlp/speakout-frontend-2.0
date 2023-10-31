import { Stack } from '@mui/material'

import {
    ApolloForm,
    ApolloFormSchemaCustomValues,
    ApolloFormSchemaGroup,
    ApolloFormSchemaItem,
} from '../../../components'

type Props = {
    filterSchema?: ApolloFormSchemaItem[]
    filterSubmit?: (value: any) => void
    filterGroups?: ApolloFormSchemaGroup[]
    filterClean?: () => void
    showFilterButtons?: boolean
    customValues?: ApolloFormSchemaCustomValues[]
    style?: React.CSSProperties | undefined
}

export default function ApolloGridTableToolbar({
    filterSchema,
    filterSubmit,
    filterGroups,
    filterClean,
    showFilterButtons,
    customValues,
    style,
}: Props) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2.5, px: 3 }} style={style}>
            {filterSchema && (
                <ApolloForm
                    onSubmit={filterSubmit ? (values: any) => filterSubmit(values) : null}
                    submitButtonText="Filtrar"
                    schema={filterSchema}
                    isFilter={false}
                    showFilterButtons={showFilterButtons}
                    withBox
                    groups={filterGroups}
                    defaultExpandedGroup={false}
                    filterClean={filterClean}
                    customValues={customValues}
                />
            )}
        </Stack>
    )
}
