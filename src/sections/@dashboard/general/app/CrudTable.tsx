import {
    Box,
    Button,
    Card,
    CardProps,
    Divider,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    styled,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Scrollbar from '../../../../components/Scrollbar'
import Iconify from '../../../../components/iconify/Iconify'
import MenuPopover from '../../../../components/menu-popover'
import { TableHeadCustom } from '../../../../components/table'

type RowArrayTypes = any
type ILabels = {
    id: string
    label: string
    link?: boolean
}

interface Props extends CardProps {
    title?: string
    subheader?: string
    tableData: RowArrayTypes
    setTableData: (data: any) => void
    tableLabels: ILabels[]
    editPagePath?: string
    clickableRow?: boolean
    colorfulstatus?: boolean
    removeFunction?: (data: any, id: string) => void
    getItems?: () => void
}

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
}))

export default function CrudTable({
    title,
    subheader,
    tableData,
    setTableData,
    tableLabels,
    editPagePath,
    clickableRow,
    removeFunction,
    getItems,
    ...other
}: Props) {
    const router = useRouter()

    return (
        <StyledCard {...other}>
            <TableContainer>
                <Scrollbar>
                    <Table sx={{ minWidth: 720 }}>
                        <TableHeadCustom headLabel={tableLabels} />

                        <TableBody>
                            {clickableRow
                                ? tableData.map(row => (
                                      <ClickableGenericTableRow
                                          key={row.id}
                                          row={row}
                                          tableLabels={tableLabels}
                                          editPagePath={editPagePath ? editPagePath : '/edicao/'}
                                          colorfulstatus
                                      />
                                  ))
                                : tableData.map(row => (
                                      <GenericTableRow
                                          key={row.id}
                                          row={row}
                                          tableLabels={tableLabels}
                                          editPagePath={editPagePath ? editPagePath : '/edicao/'}
                                          removeFunction={removeFunction}
                                          getItems={getItems}
                                      />
                                  ))}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
        </StyledCard>
    )
}

type RowProps = {
    row: any
    tableLabels: ILabels[]
    editPagePath: string
    colorfulstatus?: boolean
    removeFunction?: (data: any, id: string) => void
    getItems?: () => void
}

const formatValues = (value: any) => {
    switch (value) {
        case true:
            return 'Ativo'
        case false:
            return 'Inativo'
        case 'media':
            return 'Média'
        case 'alta':
            return 'Alta'
        case 'baixa':
            return 'Baixa'
        default:
            return value ? value.toString() : '( -- )'
    }
}

function GenericTableRow({ row, tableLabels, editPagePath, removeFunction, getItems }: RowProps) {
    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget)
    }

    const handleClosePopover = () => {
        setOpenPopover(null)
    }

    const handleEdit = () => {
        handleClosePopover()
        router.push(router.pathname + editPagePath + row.id)
    }

    const handleDelete = async (data: any, id: string) => {
        handleClosePopover()
        if (removeFunction && getItems) {
            try {
                await removeFunction(data, id)
                getItems()
            } catch (error) {}
        }
    }

    const router = useRouter()

    return (
        <>
            <TableRow sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                {tableLabels.map(
                    tl =>
                        tl.id !== 'action' &&
                        (!tl.link ? (
                            <TableCell key={tl.id}>{formatValues(row[tl.id])}</TableCell>
                        ) : (
                            <TableCell key={tl.id}>
                                <Link href={formatValues(row[tl.id])}>
                                    <a target="_blank">Acessar</a>
                                </Link>
                            </TableCell>
                        )),
                )}

                <TableCell align="left">
                    <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
                <MenuItem onClick={handleEdit}>
                    <Box display="flex" alignItems="center">
                        <Iconify icon="eva:edit-fill" />
                        <Box ml={1}>Editar</Box>
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleDelete(row, row.id)} sx={{ color: 'error.main' }}>
                    <Box display="flex" alignItems="center">
                        <Iconify icon="eva:trash-2-outline" />
                        <Box ml={1}>Excluir</Box>
                    </Box>
                </MenuItem>
            </MenuPopover>
        </>
    )
}

function ClickableGenericTableRow({ row, tableLabels }: RowProps) {
    const router = useRouter()

    const theme = useTheme()

    const backgroundButtonColors = {
        Cancelado: 'error',
        Alta: 'error',
        'Em progresso': 'warning',
        Média: 'warning',
        Novo: 'info',
        Baixa: 'info',
        Concluído: 'success',
    }

    return (
        <TableRow
            onClick={() => router.push(`/relatos/detalhes/${row.id}`)}
            sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }, cursor: 'pointer' }}
        >
            {tableLabels.map(tl => (
                <TableCell key={tl.id}>
                    {tl.id !== 'status' && tl.id !== 'sensibilidade' ? (
                        formatValues(row[tl.id])
                    ) : (
                        <Button
                            sx={{ color: 'white', whiteSpace: 'nowrap' }}
                            color={backgroundButtonColors[formatValues(row[tl.id])]}
                            variant="contained"
                        >
                            {formatValues(row[tl.id])}
                        </Button>
                    )}
                </TableCell>
            ))}
        </TableRow>
    )
}
