import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { PostController } from 'controllers/postController'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { checkPermission } from 'src/utils/functions'
import { IDashUser } from 'types/IDashUser'
import { UserSelector } from '../UserSelector'

const StyledListItem = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #a3a3a3',
}))



const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    margin: '4rem auto',
    padding: '1rem',
    borderRadius: 10,
   
    '&:hover': {
        boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
    },
}))

interface UserListProps {
    postId: string;
    selectedUsers: IDashUser[];
    setSelectedUsers: (users: IDashUser[]) => void;
}

export const UserList = ({ postId, selectedUsers, setSelectedUsers }: UserListProps) => {
    // const [selectedUsers, setSelectedUsers] = useState<IDashUser[]>([])
    const [loading, setLoading] = useState(false)
    const postController = new PostController()
    const { enqueueSnackbar } = useSnackbar()
    const [deleteUserId, setDeleteUserId] = useState('')
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const theme = useTheme()

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    const { user } = useAuthContext()

    const fetchUsers = async () => {
        setLoading(true)
        const response = await postController.getById(postId)
        if (response.data.users) {
            const users = response.data.users.map(user => ({
                id: user.id ? user.id.toString() : '',
                fullname: user.fullname,
                cpf: '',
                email: user.email,
                password: '',
                tenant: '',
                blocked: false,
                username: '',
                role: '',
                areas: [],
            }))
            setSelectedUsers(users)
        }
        setLoading(false)
    }

    const handleUserSelect = async user => {
        let updatedUsers
        if (selectedUsers.find(selectedUser => selectedUser.id === user.id)) {
            updatedUsers = selectedUsers.filter(selectedUser => selectedUser.id !== user.id)
        } else {
            updatedUsers = [...selectedUsers, user]
        }

        setSelectedUsers(updatedUsers)

        await postController.update({ users: updatedUsers }, postId)
    }

    const handleDeleteConfirmation = id => {
        setDeleteUserId(id)
        setDeleteModalOpen(true)
    }

    const handleDelete = async () => {
        const newSelectedUsers = selectedUsers.filter(user => user.id !== deleteUserId)
        setSelectedUsers(newSelectedUsers)
        await postController.update({ users: newSelectedUsers }, postId)
        setDeleteModalOpen(false)
    }

    const handleSendEmail = async selectedUser => {
        try {
            setLoading(true)
            const response = await postController.sendEmail(selectedUser.email)
            enqueueSnackbar('O convite foi enviado por email ao usuário selecionado.', { variant: 'success' })
        } catch (error) {
            enqueueSnackbar('Erro ao enviar email', { variant: 'error' })
            console.error('Erro ao enviar email', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [postId])

    return (
        <>
            <Box display="flex" justifyContent="flex-end">
                {checkPermission(user?.role) && (
                    <UserSelector selectedUsers={selectedUsers} onUserSelect={handleUserSelect} />
                )}
            </Box>
            <StyledCard sx={{border: `1px solid ${borderColor}`}}>
                <CardContent >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">Usuários do Comitê</Typography>
                    </Box>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <List sx={{ marginTop: '20px' }}>
                                {selectedUsers.map((selectedUser, index) => (
                                    <>
                                        <StyledListItem key={selectedUser.id}>
                                            <ListItemText
                                                primary={selectedUser.fullname}
                                                secondary={selectedUser.email}
                                            />
                                            <ListItemSecondaryAction>
                                                <Tooltip title="Enviar convite">
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="mail"
                                                        onClick={() => handleSendEmail(selectedUser)}
                                                        sx={{
                                                            marginX: 1,
                                                            '&:hover': {
                                                                color: 'primary.main', // Altere para a cor desejada
                                                            },
                                                        }}
                                                    >
                                                        {checkPermission(user?.role) && <SendIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Excluir usuário">
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={() => handleDeleteConfirmation(selectedUsers[0].id)}
                                                        sx={{
                                                            '&:hover': {
                                                                color: '#FF5630',
                                                            },
                                                        }}
                                                    >
                                                        {checkPermission(user?.role) && <DeleteIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                            </ListItemSecondaryAction>
                                        </StyledListItem>
                                        {index !== selectedUsers.length - 1 && <Divider />}
                                    </>
                                ))}
                            </List>
                        </>
                    )}
                </CardContent>
            </StyledCard>
            <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DialogTitle textAlign={'center'}>Confirmar Exclusão</DialogTitle>
                <DialogContent>Tem certeza que deseja excluir o usuário?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModalOpen(false)} size="large">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="error" size="large">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
