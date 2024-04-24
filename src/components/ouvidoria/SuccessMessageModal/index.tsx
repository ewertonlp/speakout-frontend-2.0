import { Button, Dialog, DialogActions } from '@mui/material'
import { useRouter } from 'next/router'
import FormSuccess from '../FormSuccess'

export function SuccessMessageModal({
    open,
    setOpen,
    protocol,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    protocol: string
}) {
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        push(`/ouvidoria/${query.company}`)
        setOpen(false)
    }

    const { push, query } = useRouter()

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <FormSuccess protocol={protocol} />
                <DialogActions>
                    <Button variant="contained" sx={{ color: '#fff', borderRadius: '30px', padding: '0.5rem 3rem' }} onClick={handleClose}>
                        FECHAR
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
