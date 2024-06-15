import { AttachFile, GetApp } from '@mui/icons-material'
import { Card, Divider, Grid, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import moment from 'moment'
import { Fragment } from 'react'
import { CustomAvatar } from 'src/components/custom-avatar'
import { IImageUpload } from 'types/IImageUpload'
import { useTheme } from '@mui/material/styles'

function ComplaintHistoryCard({
    date,
    comment,
    name,
    lightShadow,
    biggerPadding,
    files,
}: {
    date: string | undefined
    comment: string
    name: string
    lightShadow?: boolean
    biggerPadding?: boolean
    files?: IImageUpload[]
}) {
    const formattedDate = moment(date).format('DD/MM/YYYY HH:mm')
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

    return (
        <Grid item>
            <Card
                sx={{
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'card.default',
                    borderRadius: '10px',
                    mt: '2rem',
                  
                }}
            >
                <Grid p={!biggerPadding ? 1.5 : 2.5}>
                    <Grid>
                        <Grid display="flex" columnGap="10px" alignItems="center" marginBottom="15px">
                            <CustomAvatar alt={name} name={name} />
                            <Typography variant="body2" fontSize="1rem" fontWeight="bold">
                                {name}
                            </Typography>
                            <Typography variant="body2" fontSize="0.85rem" sx={{ position: 'relative', top: '1px' }}>
                                {formattedDate}h
                            </Typography>
                        </Grid>
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
                    <Typography variant="body2" fontSize="1rem">
                        {comment}
                    </Typography>
                </Grid>
            </Card>
        </Grid>
    )
}

export default ComplaintHistoryCard