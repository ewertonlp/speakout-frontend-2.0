import { AttachFile, GetApp } from '@mui/icons-material'
import { Card, Divider, Grid, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import moment from 'moment'
import { Fragment } from 'react'
import { CustomAvatar } from 'src/components/custom-avatar'
import { IImageUpload } from 'types/IImageUpload'
import { IPostActionStatus, statusEnum } from 'types/IPostAction'

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
}) {
    const formattedDate = moment(date).format('DD/MM/YYYY HH:mm')
    const formattedLastUpdateDate = moment(lastUpdateDate).format('DD/MM/YYYY HH:mm')

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

    return (
        <Grid item>
            <Card
                sx={{
                    boxShadow: !lightShadow
                        ? '0 10px 50px 5px rgba(0, 0, 0, .3)'
                        : '0 5px 20px 5px rgba(88, 88, 88, 0.3)',
                }}
            >
                <Grid p={!biggerPadding ? 1.5 : 2.5}>
                    <Grid display="flex" justifyContent="space-between">
                        <Grid display="flex" columnGap="10px" alignItems="center" marginBottom="15px">
                            <CustomAvatar alt={name} name={name} />
                            <Typography variant="body2" fontWeight="bold">
                                {name}
                            </Typography>
                            <Typography variant="body2" fontSize="12px" sx={{ position: 'relative', top: '1px' }}>
                                {formattedDate}h
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle2">{title}</Typography>
                    <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
                        {description}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Status: </strong>
                        {statusEnum[status]}
                    </Typography>
                    <Typography variant="body2">Última edição: {formattedLastUpdateDate}</Typography>
                    {files && (
                        <Grid item xs={12} mb="15px">
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
                                            >
                                                <GetApp />
                                            </IconButton>
                                        </ListItem>
                                        <Divider />
                                    </Fragment>
                                ))}
                            </>
                        </Grid>
                    )}
                </Grid>
            </Card>
        </Grid>
    )
}

export default ActionCard
