import { Card, Grid, Typography } from '@mui/material'
import moment from 'moment'
import { CustomAvatar } from 'src/components/custom-avatar'
import Iconify from 'src/components/Iconify'

function ActionCommentCard({
    date,
    lightShadow,
    name,
    title,
    description,
    handleDelete,
}: {
    date: string | undefined
    title: string
    description: string
    name: string
    lightShadow?: boolean
    handleDelete: () => void
}) {
    const formattedDate = moment(date).format('DD/MM/YYYY HH:mm')

    return (
        <Grid item>
            <Card
                sx={{
                    boxShadow: !lightShadow
                        ? '0 10px 50px 5px rgba(0, 0, 0, .3)'
                        : '0 5px 20px 5px rgba(88, 88, 88, 0.3)',
                }}
            >
                <Grid p={2.5}>
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
                        <Iconify icon="ph:trash" color="red" width="20px" height="20px" onClick={handleDelete} />
                    </Grid>
                    <Typography variant="subtitle2">{title}</Typography>
                    <Typography variant="body2">{description}</Typography>
                </Grid>
            </Card>
        </Grid>
    )
}

export default ActionCommentCard
