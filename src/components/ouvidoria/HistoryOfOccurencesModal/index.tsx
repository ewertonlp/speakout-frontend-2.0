import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { IPostHistory } from 'types/IPostHistory'
import ComplaintHistoryCard from '../ComplaintHistoryCard'

export function HistoryofOccurencesModal({
    history,
    open,
    setOpen,
}: {
    history: IPostHistory[]
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="scroll-dialog-title">
                    {history && history.length > 0 ? `Histórico` : `Sem histórico`}
                </DialogTitle>
                <DialogContent sx={{ padding: '0' }}>
                    <Grid
                        display="flex"
                        flexDirection="column"
                        rowGap="25px"
                        p={2}
                        item
                        lg={8}
                        xs={12}
                        margin="0 auto"
                        minHeight={'auto'}
                        sx={{ minWidth: { xs: '100%', md: '500px' } }}
                    >
                        {(history &&
                            history.length > 0 &&
                            history.map((post, index) => (
                                <ComplaintHistoryCard
                                    key={index}
                                    date={post.createdAt}
                                    name={post.user.fullname}
                                    comment={post.comment}
                                />
                            ))) || (
                            <Typography variant="body1" textAlign={'center'} fontWeight={600}>
                                Solicitação em análise
                            </Typography>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
