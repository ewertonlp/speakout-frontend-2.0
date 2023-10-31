import { useState } from 'react'

import { MenuItem, TableCell, TableRow } from '@mui/material'

// import {Iconify} from '@iob360/shared'
// import {Table} from '@iob360/shared'
import { get } from 'lodash'
import Iconify from '../../../components/iconify/Iconify'
import { TableMoreMenu, TableSchemaColumnProps } from '../../../components/table'

type Props = {
    row: any
    rowSchema: TableSchemaColumnProps[]
    selected: boolean
    onEditRow?: VoidFunction
    onSelectRow?: VoidFunction
    onDeleteRow?: VoidFunction
    onNavigateRow?: VoidFunction
    showGridActions?: boolean
}

export default function ApolloGridTableRow({
    row,
    rowSchema,
    selected,
    onSelectRow,
    onDeleteRow,
    onEditRow,
    onNavigateRow,
    showGridActions,
}: Props) {
    const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null)

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setOpenMenuActions(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setOpenMenuActions(null)
    }

    const renderRow = (row: any) => {
        if (!row) return

        const returnedRows: any = []

        rowSchema.forEach((column: TableSchemaColumnProps) => {
            if (column.id != '') {
                if (column.valueGetter) {
                    returnedRows.push(<TableCell>{column.valueGetter(row)}</TableCell>)
                } else if (column.renderCell) {
                    returnedRows.push(<TableCell>{column.renderCell(row)}</TableCell>)
                } else {
                    returnedRows.push(<TableCell>{get(row, column.id)}</TableCell>)
                }
            }
        })

        return returnedRows
    }

    return (
        <TableRow hover selected={selected}>
            {renderRow(row)}
            {showGridActions && (
                <TableCell align="right">
                    <TableMoreMenu
                        open={openMenu}
                        onOpen={handleOpenMenu}
                        onClose={handleCloseMenu}
                        actions={
                            onDeleteRow || onEditRow ? (
                                <>
                                    {onDeleteRow && (
                                        <MenuItem
                                            onClick={() => {
                                                onDeleteRow()
                                                handleCloseMenu()
                                            }}
                                            sx={{ color: 'error.main' }}
                                        >
                                            <Iconify icon={'eva:trash-2-outline'} />
                                            Remover
                                        </MenuItem>
                                    )}
                                    {onEditRow && (
                                        <MenuItem
                                            onClick={() => {
                                                onEditRow()
                                                handleCloseMenu()
                                            }}
                                        >
                                            <Iconify icon={'eva:edit-fill'} />
                                            Editar
                                        </MenuItem>
                                    )}

                                    {onNavigateRow && (
                                        <MenuItem
                                            onClick={() => {
                                                onNavigateRow()
                                                handleCloseMenu()
                                            }}
                                        >
                                            <Iconify icon={'eva:external-link-fill'} />
                                            Acessar
                                        </MenuItem>
                                    )}
                                </>
                            ) : undefined
                        }
                    />
                </TableCell>
            )}
        </TableRow>
    )
}
