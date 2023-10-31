import { Skeleton, Stack, TableCell, TableRow, TableRowProps } from '@mui/material'
import { TableSchemaColumnProps } from './types/tableTypes'

interface TableSkeletonProps {
    columns?: TableSchemaColumnProps[]
}

export default function TableSkeleton({ columns, ...other }: TableSkeletonProps & TableRowProps) {
    return (
        <TableRow {...other}>
            <TableCell colSpan={9}>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', spacing: 3 }}>
          <CircularProgress />
        </Box> */}

                {/* <Stack spacing={3} display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
          <Typography variant="subtitle2" color={"primary.default"}>
            Carregando Dados...
          </Typography>
        </Stack> */}

                {!columns ? (
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} />
                        <Skeleton variant="text" width={240} height={20} />
                        <Skeleton variant="text" width={160} height={20} />
                        <Skeleton variant="text" width={160} height={20} />
                        <Skeleton variant="text" width={160} height={20} />
                        <Skeleton variant="text" width={160} height={20} />
                    </Stack>
                ) : (
                    <Stack spacing={3} direction="row" alignItems="center">
                        {columns.map((column: TableSchemaColumnProps, index: number) => (
                            <Skeleton variant="text" width={100} height={30} key={`${column}${index}`} />
                        ))}
                    </Stack>
                )}
            </TableCell>
        </TableRow>
    )
}
