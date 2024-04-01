import AddIcon from '@mui/icons-material/Add'
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import { PostController } from 'controllers/postController'
import UserController from 'controllers/userController'
import { useEffect, useState } from 'react'
import { IDashUser } from 'types/IDashUser'

export const UserSelector = ({ onUserSelect, selectedUsers }) => {
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState<IDashUser[]>([])

    const postController = new PostController()

    useEffect(() => {
        async function getUsers() {
            const userController = new UserController()
            const usersData = await userController.getAll()
            setUsers(usersData)
        }
        getUsers()
    }, [])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleUserSelect = async user => {
        onUserSelect(user)
    }

    return (
        <>
            <Button variant="contained" sx={{paddingX: '1rem', paddingY: '0.7rem'}} onClick={handleOpen}>
                <AddIcon /> Adicionar Usuário Temporário
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Selecione um usuário</DialogTitle>
                <DialogContent>
                    <List>
                        {users.map(user => (
                            <ListItem
                                key={user.id}
                                role={undefined}
                                dense
                                button
                                onClick={() => handleUserSelect(user)}
                            >
                                <Checkbox
                                    edge="start"
                                    checked={selectedUsers.some(selectedUser => selectedUser.id === user.id)}
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={() => handleUserSelect(user)}
                                />

                                <ListItemText primary={user.fullname} secondary={user.email} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
