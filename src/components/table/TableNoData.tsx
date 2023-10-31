import { TableCell, TableRow } from '@mui/material'
//
import EmptyContent from '../empty-content'

type Props = {
    isNotFound: boolean
}

export default function TableNoData({ isNotFound }: Props) {
    return (
        <>
            {isNotFound ? (
                <TableRow>
                    <TableCell colSpan={9}>
                        <EmptyContent
                            title="Ops! Nenhuma informação encontrada."
                            img={'https://minimals.cc/assets/illustrations/illustration_empty_content.svg'}
                            sx={{
                                '& span.MuiBox-root': { height: 160 },
                            }}
                        />
                    </TableCell>
                </TableRow>
            ) : (
                <TableRow>
                    <TableCell colSpan={9} sx={{ p: 0 }} />
                </TableRow>
            )}
        </>
    )
}
