import AddIcon from '@mui/icons-material/Add'
import { Button, Grid, Typography } from '@mui/material'
import { PostController } from 'controllers/postController'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { checkPermission } from 'src/utils/functions'
import { IPostListing } from 'types/IPostListing'
import { NewActionModal } from '../NewActionModal'
import ActionCard from '../ouvidoria/ActionCard'

function ActionsPage({ post, getPost }: { post: IPostListing; getPost: (id: string) => void }) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const postController = new PostController()
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)

    const { push, query } = useRouter()

    const { user } = useAuthContext()

    // const handleSendEmail = async () => {
    //     const email = post.users
    //     try {
    //         setLoading(true)
    //         const response = await postController.sendEmail(email)
    //         enqueueSnackbar('O convite foi enviado por email ao usuário selecionado.', { variant: 'success' })
    //     } catch (error) {
    //         enqueueSnackbar('Erro ao enviar email', { variant: 'error' })
    //         console.error('Erro ao enviar email', error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

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
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ paddingX: '1rem', paddingY: '0.7rem' }}
                        onClick={() => setOpenModal(true)}
                    >
                        <AddIcon /> Cadastrar Nova ação
                    </Button>
                )}
            </Grid>
            {(post.postactions &&
                post.postactions.length > 0 &&
                post.postactions.map((action, index) => (
                    <div
                        key={index}
                        onClick={() => push(`/relatos/detalhes/edit-action/${action.id}?post=${query.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <ActionCard
                            date={action.createdAt!}
                            name={action.user ? action.user.fullname : 'Desconhecido'}
                            title={action.title}
                            description={action.description}
                            status={action.status}
                            lastUpdateDate={'2023-08-07'}
                            files={action.media}
                            lightShadow
                            biggerPadding
                      
                        />
                        {/* <div>
                            <Tooltip title="Enviar convite">
                                <IconButton
                                    edge="end"
                                    aria-label="mail"
                                    onClick={e => {
                                        e.stopPropagation() // Impede que o clique se propague para o ActionCard
                                        handleSendEmail()
                                    }}
                                    sx={{
                                        marginX: 2,
                                    }}
                                >
                                    {checkPermission(user?.role) && <SendIcon />}
                                </IconButton>
                            </Tooltip>
                        </div> */}
                    </div>
                ))) || (
                <Typography variant="body1" textAlign={'center'} fontWeight={600}>
                    Ainda não existe histórico para exibir
                </Typography>
            )}
            <NewActionModal users={post.users} setOpen={setOpenModal} open={openModal} getPost={getPost} />
        </Grid>
    )
}

export default ActionsPage
