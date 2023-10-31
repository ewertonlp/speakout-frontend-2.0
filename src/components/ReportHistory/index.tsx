import AddIcon from '@mui/icons-material/Add'
import { Button, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { checkPermission } from 'src/utils/functions'
import { IPostHistory } from 'types/IPostHistory'
import ComplaintHistoryCard from '../ouvidoria/ComplaintHistoryCard'
import { NewCommentModal } from '../ouvidoria/NewCommentModal'

function ReportHistory({ histories, getPost }: { histories: IPostHistory[]; getPost: (id: string) => void }) {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const { user } = useAuthContext()

    return (
        <Grid
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',
            }}
        >
            <Grid
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                {checkPermission(user?.role) && (
                    <Button variant="contained" onClick={() => setOpenModal(true)}>
                        <AddIcon /> Nova mensagem
                    </Button>
                )}
            </Grid>
            {(histories &&
                histories.length > 0 &&
                histories.map((post, index) => (
                    <ComplaintHistoryCard
                        key={index}
                        date={post.createdAt!}
                        name={post.user ? post.user.fullname : 'Desconhecido'}
                        comment={post.comment}
                        files={post.media}
                        lightShadow
                        biggerPadding
                    />
                ))) || (
                <Typography variant="body1" textAlign={'center'} fontWeight={600}>
                    Ainda não existe histórico para exibir
                </Typography>
            )}
            <NewCommentModal setOpen={setOpenModal} open={openModal} getPost={getPost} />
        </Grid>
    )
}

export default ReportHistory
