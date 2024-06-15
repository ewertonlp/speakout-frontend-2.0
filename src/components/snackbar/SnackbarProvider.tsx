import { SnackbarProvider as NotistackProvider, SnackbarKey } from 'notistack'
import { useRef } from 'react'
// @mui
import { Box, Collapse, IconButton } from '@mui/material'
//
import Iconify from '../iconify/Iconify'
import { useSettingsContext } from '../settings'
//
import { IconifyIcon } from '@iconify/react'
import StyledNotistack from './styles'


// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode
}

export default function SnackbarProvider({ children }: Props) {
    const { themeDirection } = useSettingsContext()

    const isRTL = themeDirection === 'rtl'

    const notistackRef = useRef<any>(null)

    const onClose = (key: SnackbarKey) => () => {
        notistackRef.current.closeSnackbar(key)
    }

    return (
        <>
            <StyledNotistack />
            <NotistackProvider
                ref={notistackRef}
                dense
                maxSnack={5}
                preventDuplicate
                autoHideDuration={5000}
                TransitionComponent={isRTL ? Collapse : undefined}
                variant="success" // Set default variant
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                iconVariant={{
                    info: <SnackbarIcon icon="eva:info-fill" color="info" />,
                    success: <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success" />,
                    warning: <SnackbarIcon icon="eva:alert-triangle-fill" color="warning" />,
                    error: <SnackbarIcon icon="eva:alert-circle-fill" color="error" />,
                }}
                // With close as default
                action={key => (
                    <IconButton size="small" onClick={onClose(key)} sx={{ p: 1 }}>
                        <Iconify icon="eva:close-fill" color='#fff' />
                    </IconButton>
                )}
            >
                {children}
            </NotistackProvider>
        </>
    )
}

// ----------------------------------------------------------------------

type SnackbarIconProps = {
    icon: IconifyIcon | string
    color: 'info' | 'success' | 'warning' | 'error'
}

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
    return (
        <Box
            component="span"
            sx={{
                mr: 2,
                width: 50,
                height: 50,
                display: 'flex',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                color: `${color}.main`,
                bgcolor: theme => (theme.palette.grey[100]),
            }}
        >
            <Iconify icon={icon} width={30} />
        </Box>
    )
}
