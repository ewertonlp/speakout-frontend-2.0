import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Fab, Link } from '@mui/material'
import { useRouter } from 'next/router'

function AddButton() {
    const router = useRouter()

    return (
        <Link href={router.pathname + '/cadastro'}>
            <Fab variant="extended">
                <AddCircleOutlineIcon sx={{ mr: 1, color: 'white' }} />
                Adicionar
            </Fab>
        </Link>
    )
}

export default AddButton
