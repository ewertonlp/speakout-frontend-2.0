import { AttachFile, GetApp } from '@mui/icons-material'
// import DeleteIcon from '@mui/icons-material/Delete'
import {
    Card,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material'
import moment from 'moment'
import { Fragment } from 'react'
import { CustomAvatar } from 'src/components/custom-avatar'
import Iconify from 'src/components/Iconify'
import { IImageUpload } from 'types/IImageUpload'
import { IPostActionStatus, statusEnum } from 'types/IPostAction'
import { useTheme } from '@mui/material/styles'

function ActionCard({
    date,
    lightShadow,
    biggerPadding,
    lastUpdateDate,
    name,
    status,
    title,
    description,
    files,
    onDelete,
    deleteAction,
}: {
    date: string | undefined
    title: string
    description: string
    status: IPostActionStatus
    name: string
    lastUpdateDate: string
    lightShadow?: boolean
    biggerPadding?: boolean
    files?: IImageUpload[]
    onDelete: (actionId:string) => void
    deleteAction: string
}) {
    const formattedDate = moment(date).format('DD/MM/YYYY HH:mm')
    const formattedLastUpdateDate = moment(lastUpdateDate).format('DD/MM/YYYY HH:mm')

    const theme = useTheme()

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    const downloadFile = async (file: IImageUpload) => {
        const link = document.createElement('a')
        link.href = file.url
        if (
            file.name.endsWith('.png') ||
            file.name.endsWith('.jpeg') ||
            file.name.endsWith('svg') ||
            file.name.endsWith('.pdf') ||
            file.name.endsWith('.jpg')
        ) {
            link.target = '_blank'
        } else {
            link.download = file.name
        }
        link.click()
    }

    const handleDeleteAction = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (onDelete && typeof onDelete === 'function') {
            console.log(onDelete)
            if (deleteAction) {
                onDelete(deleteAction) 
            } else {
                console.error("ID da ação não está definido.")
            }
        }
    }

    return (
        <Grid item>
            <Card
                sx={{
                    // boxShadow: !lightShadow ? '0 5px 5px rgba(0, 0, 0, .08)' : '0 5px 10px  rgba(0, 0, 0, 0.1)',
                    borderRadius: '15px',
                    backgroundColor: 'card.default',
                    border: `1px solid ${borderColor}`,
                    padding: '1rem',
                    mt: '2rem',
                    '&:hover': {
                        boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
                    },
                }}
            >
                <Grid p={!biggerPadding ? 1.5 : 2.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid display="flex" flexDirection="column" justifyContent="space-between" alignItems="flex-start">
                        <Grid display="flex" columnGap="10px" alignItems="center" marginBottom="15px">
                            <CustomAvatar alt={name} name={name} />
                            <Typography variant="body2" fontSize="1rem" textTransform="capitalize" fontWeight="bold">
                                {name}
                            </Typography>
                            <Typography variant="body2" fontSize="0.85rem" sx={{ position: 'relative', top: '1px' }}>
                                {formattedDate}h
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="subtitle2" fontSize="1rem">
                                {title}
                            </Typography>
                            <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
                                {description}
                            </Typography>
                            <Typography variant="body2" fontSize="1rem" pt={3}>
                                <strong>Status: </strong>
                                {statusEnum[status]}
                            </Typography>
                            <Typography variant="body2">Última edição: {formattedLastUpdateDate}</Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'end',
                        }}
                    >
                        <Grid >
                            {files && (
                                <>
                                    {files.map(file => (
                                        <Fragment key={file.id}>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <AttachFile fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primaryTypographyProps={{ fontSize: '14px' }}
                                                    primary={file.name}
                                                />
                                                <IconButton
                                                    onClick={() => downloadFile(file)}
                                                    color="primary"
                                                    aria-label="download file"
                                                    sx={{ ml: '1rem', p:1 }}
                                                >
                                                    <GetApp />
                                                </IconButton>
                                            </ListItem>
                                            <Divider />
                                        </Fragment>
                                    ))}
                                </>
                            )}
                        </Grid>
                        <Grid>
                            <Tooltip title="Excluir Ação">
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleDeleteAction}
                                    sx={{
                                        '&:hover': {
                                            color: '#FF5630',
                                        },
                                    }}
                                >
                                    <Iconify icon="eva:trash-2-fill" />
                                    {/* {checkPermission(user?.role) && <DeleteIcon />} */}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default ActionCard
