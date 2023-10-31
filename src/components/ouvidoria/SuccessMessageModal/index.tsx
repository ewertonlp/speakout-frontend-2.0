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
                    <Button variant="outlined" sx={{ color: 'green', borderColor: 'green' }} onClick={handleClose}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
