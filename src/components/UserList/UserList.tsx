import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { PostController } from 'controllers/postController'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { checkPermission } from 'src/utils/functions'
import { IDashUser } from 'types/IDashUser'
import { UserSelector } from '../UserSelector'


const StyledListItem = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
}))

const StyledCard = styled(Card)({
    margin: '2rem auto',
    padding: '1rem',
    borderRadius: 15,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
})
export const UserList = ({ postId }) => {
    const [selectedUsers, setSelectedUsers] = useState<IDashUser[]>([])
    const [loading, setLoading] = useState(false)
    const postController = new PostController()
    const { enqueueSnackbar } = useSnackbar()

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

    const handleDelete = async userToDelete => {
        const newSelectedUsers = selectedUsers.filter(user => user.id !== userToDelete.id)

        setSelectedUsers(newSelectedUsers)

        await postController.update({ users: newSelectedUsers }, postId)
    }

    const handleSendEmail = async (selectedUser) => {
        try {
            setLoading(true);
            const response = await postController.sendEmail(selectedUser.email);
            enqueueSnackbar('O convite foi enviado por email ao usuário selecionado.', { variant: 'success' })
        } catch (error) {
            enqueueSnackbar('Erro ao enviar email', { variant: 'error' })
            console.error('Erro ao enviar email', error)
        } finally {
            setLoading(false);
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
            <StyledCard>
                <CardContent>
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
                                                            marginX: 2,
                                                        }}
                                                    >
                                                        {checkPermission(user?.role) && <SendIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Excluir usuário">
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={() => handleDelete(selectedUser)}
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
        </>
    )
}
