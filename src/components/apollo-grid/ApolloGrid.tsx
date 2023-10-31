import { useEffect, useState } from 'react'

import {
    Box,
    Button,
    Card,
    FormControlLabel,
    LabelDisplayedRowsArgs,
    Switch,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
} from '@mui/material'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useTableApollo, { TableApolloProps } from '../../hooks/useTableApollo'
import Scrollbar from '../Scrollbar'

import { TableHeadCustom, TableNoData, TableSelectedActions, TableSkeleton } from '../table'
// sections

import { useSnackbar } from 'notistack'
import { HypercubeGetPagedRequest, HypercubePagedResult } from '../../@types/hypercubeRequest.g'
import ApolloGridTableRow from '../../sections/@dashboard/apollo-grid/ApolloGridTableRow'
import ApolloGridTableToolbar from '../../sections/@dashboard/apollo-grid/ApolloGridTableToolbar'
import useSyncState from '../../utils/useSyncState'
import { ApolloFormSchemaCustomValues, ApolloFormSchemaGroup, formError } from '../apollo-form/ApolloForm.component'
import { TableSchemaColumnProps } from '../table/types/tableTypes'

export type ApolloGridProps = {
    handleSearch: (pagedRequesT: HypercubeGetPagedRequest<any>) => Promise<HypercubePagedResult<any>>
    handleDelete?: (id: any) => Promise<void>
    handleEdit?: (id: any) => Promise<any>
    handleNavigate?: (id: any) => Promise<void>
    filterClean?: () => void
    customValues?: ApolloFormSchemaCustomValues[]
    mode?: 'simple'
    columns: TableSchemaColumnProps[]
    refresh: boolean
    filterSchema?: any[]
    keyColumnName?: string
    tableApolloProps?: TableApolloProps
    showDenseOption?: boolean
    filterGroups?: ApolloFormSchemaGroup[]
    showGridActions?: boolean
    showTableNoData?: boolean
    showPagination?: boolean
    dense?: boolean
    tableHeight?: number
    fullWidth?: boolean
    deleteConfirm?: string
}

const ApolloGrid = ({
    handleSearch,
    handleDelete,
    handleEdit,
    handleNavigate,
    mode = 'simple',
    columns,
    refresh,
    filterSchema,
    keyColumnName = 'id',
    showDenseOption = false,
    tableApolloProps,
    filterGroups,
    filterClean,
    customValues,
    showGridActions = true,
    showTableNoData = true,
    showPagination = true,
    dense = false,
    tableHeight,
    fullWidth = false,
    deleteConfirm = 'Tem certeza que deseja excluir o registro selecionado?',
}: ApolloGridProps) => {
    const {
        order,
        orderBy,
        selected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,

        onChangeDense,
    } = useTableApollo(tableApolloProps)

    const [isLoading, setIsLoading] = useState(true)

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [currentId, setCurrentId] = useState('')

    const page = useSyncState(0)

    const [tableData, setTableData] = useState<any[]>([])

    const [rowsCount, setRowsCount] = useState(0)

    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [filterValues, setFilterValues] = useState({})

    const { enqueueSnackbar } = useSnackbar()

    const searchWrapper = (values: any) => {
        handleFilter(values)
    }

    const filterCleanWrapper = () => {
        if (filterClean) filterClean()
        setFilterValues({})
    }

    const handleFilter = (values: any) => {
        page.set(0)
        setFilterValues({ ...values })
    }

    const localGetData = (): Promise<HypercubePagedResult<any>> => {
        const request: HypercubeGetPagedRequest<any> = {
            limit: 100,
            page: page.get() + 1,
            pageSize: rowsPerPage,
            filter: filterValues,
        }

        if (orderBy != '') {
            request.sort = [{ fieldName: orderBy, direction: order }]
        }

        return handleSearch(request)
    }

    const updateTableData = () => {
        const request = localGetData()
        setIsLoading(true)
        request
            .then((response: HypercubePagedResult<any>) => {
                setRowsCount(response.rowCount)
                setTableData(response.results)
            })
            .catch((error: any) => {
                formError(error, enqueueSnackbar)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        updateTableData()
    }, [refresh])

    useEffect(() => {
        updateTableData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowsPerPage, filterValues, orderBy, order])

    const onChangePage = (event: unknown, newPage: number) => {
        setIsLoading(true)
        if (event) {
            page.set(newPage)

            updateTableData()
        } else {
            page.set(0)
        }
    }

    const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        page.set(0)
    }

    const handleDeleteRow = async (id: string) => {
        setCurrentId(id)
        setIsDialogOpen(true)
    }

    const deleteRow = async (id: string) => {
        if (handleDelete) {
            handleDelete(id)
            setIsDialogOpen(false)
        }
    }

    const handleEditRow = async (id: any) => {
        if (mode === 'simple') {
            // await delay(5000);
            if (handleEdit) {
                setIsLoading(true)
                handleEdit(id).finally(() => {
                    setIsLoading(false)
                })
            }
            return
        }
    }

    const handleNavigateRow = async (id: any) => {
        if (handleNavigate) {
            setIsLoading(true)
            handleNavigate(id).finally(() => {
                setIsLoading(false)
            })
        }
        return
    }

    const handleDialogCancel = () => {
        setIsDialogOpen(false)
    }

    const denseHeight = dense ? 60 : 80

    const isNotFound = !tableData.length || (!isLoading && !tableData.length)

    const customLabelDisplayedRows = (paginationInfo: LabelDisplayedRowsArgs): string =>
        `${paginationInfo.from}–${paginationInfo.to} de ${
            paginationInfo.count !== -1 ? paginationInfo.count : `mais de ${paginationInfo.to}`
        }`

    return (
        <Card>
            <ApolloGridTableToolbar
                filterSchema={filterSchema}
                filterSubmit={searchWrapper}
                filterGroups={filterGroups}
                filterClean={filterCleanWrapper}
                customValues={customValues}
            />
            <Scrollbar>
                <TableContainer
                    sx={{
                        width: fullWidth ? '100%' : 'auto',
                        minWidth: fullWidth ? 'auto' : '800',
                        height: tableHeight ? tableHeight : 'auto',
                    }}
                >
                    {selected.length > 0 && (
                        <TableSelectedActions
                            dense={dense}
                            numSelected={selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={checked =>
                                onSelectAllRows(
                                    checked,
                                    tableData.map((row: any) => row[keyColumnName]),
                                )
                            }
                        />
                    )}

                    <Table size={dense ? 'small' : 'medium'}>
                        <TableHeadCustom
                            order={order}
                            orderBy={orderBy}
                            headLabel={columns}
                            rowCount={tableData.length}
                            numSelected={selected.length}
                            onSort={onSort}
                        />

                        <TableBody>
                            {(isLoading ? [...Array(rowsPerPage)] : tableData).map(
                                (row, index) =>
                                    row && (
                                        <ApolloGridTableRow
                                            key={row[keyColumnName]}
                                            row={row}
                                            rowSchema={columns}
                                            selected={selected.includes(row[keyColumnName])}
                                            onSelectRow={() => onSelectRow(row[keyColumnName])}
                                            onDeleteRow={
                                                !handleDelete ? undefined : () => handleDeleteRow(row[keyColumnName])
                                            }
                                            onEditRow={
                                                !handleEdit ? undefined : () => handleEditRow(row[keyColumnName])
                                            }
                                            onNavigateRow={
                                                !handleNavigate
                                                    ? undefined
                                                    : () => handleNavigateRow(row[keyColumnName])
                                            }
                                            showGridActions={showGridActions}
                                        />
                                    ),
                            )}

                            {isLoading && <TableSkeleton sx={{ height: denseHeight }} columns={columns} />}
                            {!isLoading && <TableNoData isNotFound={isNotFound && showTableNoData} />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            {showPagination && (
                <Box sx={{ position: 'relative' }}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={rowsCount}
                        rowsPerPage={rowsPerPage}
                        page={page.get()}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        labelRowsPerPage="Registros por página"
                        labelDisplayedRows={customLabelDisplayedRows}
                    />
                    {showDenseOption && (
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={onChangeDense} />}
                            label="Dense"
                            sx={{
                                px: 3,
                                py: 1.5,
                                top: 0,
                                position: { md: 'absolute' },
                            }}
                        />
                    )}
                </Box>
            )}

            <Dialog open={isDialogOpen}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>{deleteConfirm}</DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDialogCancel}>
                        Cancelar
                    </Button>
                    <Button onClick={() => deleteRow(currentId)}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}

export default ApolloGrid
