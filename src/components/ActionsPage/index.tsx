import AddIcon from '@mui/icons-material/Add'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { PostActionController } from 'controllers/postActionController'
import { PostController } from 'controllers/postController'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { checkPermission } from 'src/utils/functions'
import { IPostListing } from 'types/IPostListing'
import { NewActionModal } from '../NewActionModal'
import ActionCard from '../ouvidoria/ActionCard'
import { IPostActionGet } from 'types/IPostAction'

function ActionsPage({ post, getPost }: { post: IPostListing; getPost: (id: string) => void }) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const postController = new PostController()
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const [deleteAction, setDeleteAction] = useState<string>('')
    const [postActions, setPostActions] = useState<IPostActionGet[]>([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

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

    const postActionController = new PostActionController()

    // const fetchActions = async () => {
    //     try {
    //         const updatedPost = await postActionController.getById(post.id)
    //         setPostActions(updatedPost)
    //     } catch (error) {
    //         console.error('Erro ao buscar ações:', error)
    //     }
    // }

    const handleDeleteAction = async () => {
        if (deleteAction) {
            try {
                const updatedActions: IPostActionGet[] = await postActionController.delete(deleteAction);
                enqueueSnackbar('Ação excluída com sucesso', { variant: 'success' });
                setPostActions(updatedActions);
            } catch (error) {
                console.error('Erro ao excluir a ação:', error);
                enqueueSnackbar('Erro ao excluir a Ação', { variant: 'error' });
            } finally {
                setDeleteModalOpen(false);
                setDeleteAction('');
            }
        }
    };

    const handleDeleteConfirmation = (id: string) => {
        setDeleteAction(id)
        setDeleteModalOpen(true)
    }

    useEffect(() => {
        setPostActions(post.postactions);
    }, [post.postactions])

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
                        sx={{ paddingX: '1rem', paddingY: '0.7rem', borderRadius: '30px' }}
                        onClick={() => setOpenModal(true)}
                    >
                        <AddIcon /> Cadastrar Nova ação
                    </Button>
                )}
            </Grid>
            {(post.postactions.length > 0 &&
                post.postactions.map((action, index) => (
                    <div
                        key={index}
                        onClick={() => push(`/relatos/detalhes/edit-action/${action.id}?post=${query.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <ActionCard
                            id={action.id}
                            date={action.createdAt!}
                            name={action.user ? action.user.fullname : 'Desconhecido'}
                            title={action.title}
                            description={action.description}
                            status={action.status}
                            lastUpdateDate={'2023-08-07'}
                            files={action.media}
                            lightShadow
                            biggerPadding
                            onDelete={() => handleDeleteConfirmation(action.id)}
                        />
                    </div>
                ))) || (
                <Typography variant="h5" textAlign={'center'} fontWeight={500}>
                    Ainda não existe Ações para exibir
                </Typography>
            )}
            <NewActionModal users={post.users} setOpen={setOpenModal} open={openModal} getPost={getPost} />
            <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DialogTitle textAlign={'center'}>Confirmar Exclusão</DialogTitle>
                <DialogContent>Tem certeza que deseja excluir esta Ação?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModalOpen(false)} size="large">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteAction} color="error" size="large">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default ActionsPage
