import {
    Box,
    Button,
    Card,
    CardProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    styled,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Scrollbar from '../../../../components/Scrollbar'
import Iconify from '../../../../components/iconify/Iconify'
// import MenuPopover from '../../../../components/menu-popover'
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
    onDelete?: (id: string) => void
    getItems?: () => void
    onSelectedStatus?: () => void
}

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.shadows[8],
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
    onDelete,
    getItems,
    onSelectedStatus,
    ...other
}: Props) {
    const router = useRouter()

    return (
        <StyledCard {...other}>
            <TableContainer sx={{ maxWidth: '100%' }}>
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
                                          onDelete={onDelete}
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
    onDelete?: (id: string) => void
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
    const theme = useTheme()
    const backgroundColor = theme.palette.mode === 'dark' ? '#141A29' : '#f5f5f5'
    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

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

    // const handleDelete = async (data: any, id: string) => {
    //     console.log(data)
    //     if (removeFunction && getItems) {
    //         try {
    //             await removeFunction(data, id)
    //             getItems()
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     handleClosePopover()
    // }

    const router = useRouter()

    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    // Função para abrir o modal de exclusão
    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true)
    }

    // Função para fechar o modal de exclusão
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }

    return (
        <>
            <TableRow
                sx={{
                    backgroundColor: backgroundColor,
                    borderBottom: `1px solid ${borderColor}`,
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                }}
            >
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

                <TableCell align="center" sx={{ display: 'flex' }}>
                    <MenuItem onClick={handleEdit}>
                        <Box display="flex" alignItems="center">
                            <Iconify icon="eva:edit-fill" />
                        </Box>
                    </MenuItem>
                    <Divider />
                    {/* <MenuItem onClick={handleOpenDeleteModal} sx={{ color: 'error.main' }}>
                        <Box display="flex" alignItems="center">
                            <Iconify icon="eva:trash-2-fill" />
                        </Box>
                    </MenuItem> */}
                    <Dialog
                        open={openDeleteModal}
                        onClose={handleCloseDeleteModal}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Confirmação de Exclusão</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" gutterBottom>
                                Tem certeza de que deseja realizar essa ação?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteModal} color="primary">
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => {
                                    // removeFunction(disableUser)
                                    handleCloseDeleteModal()
                                }}
                                color="error"
                                autoFocus
                            >
                                Confirmar Exclusão
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableCell>
            </TableRow>
        </>
    )
}

function ClickableGenericTableRow({ row, tableLabels, onDelete }: RowProps) {
    const router = useRouter()
    const theme = useTheme()
    const backgroundColor = theme.palette.mode === 'dark' ? '#141A29' : '#f5f5f5'
    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    const backgroundButtonColors = {
        Cancelado: 'error',
        Alta: 'error',
        'Em progresso': 'warning',
        Média: 'warning',
        Novo: 'info',
        Baixa: 'info',
        Concluído: 'success',
    }

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (onDelete) {
            onDelete(row.id)
        }
    }

    return (
        <TableRow
            onClick={() => router.push(`/relatos/detalhes/${row.id}`)}
            sx={{
                backgroundColor: backgroundColor,
                borderBottom: `1px solid ${borderColor}`,
                '&:hover': { backgroundColor: theme.palette.action.hover },
            }}
        >
            {tableLabels.map(tl => (
                <TableCell key={tl.id}>
                    {tl.id !== 'status' && tl.id !== 'sensibilidade' ? (
                        formatValues(row[tl.id])
                    ) : (
                        <Button
                            sx={{ color: 'white', whiteSpace: 'nowrap', width:'190px' }}
                            color={backgroundButtonColors[formatValues(row[tl.id])]}
                            variant="contained"
                        >
                            {formatValues(row[tl.id])}
                        </Button>
                    )}
                </TableCell>
            ))}
            <TableCell align="left">
                <IconButton sx={{ color: 'error.main' }} onClick={handleDeleteClick} title="Excluir Relato">
                    <Iconify icon="eva:trash-2-fill" />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
