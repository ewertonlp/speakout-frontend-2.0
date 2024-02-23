import { SnackbarProvider as NotistackProvider, SnackbarKey } from 'notistack'
import { useRef } from 'react'
// @mui
import { Box, Collapse, IconButton } from '@mui/material'
import { alpha } from '@mui/material/styles'
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                iconVariant={{
                    info: <SnackbarIcon icon="eva:info-fill" color="info" />,
                    success: <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success" />,
                    warning: <SnackbarIcon icon="eva:alert-triangle-fill" color="warning" />,
                    error: <SnackbarIcon icon="eva:alert-circle-fill" color="error" />,
                }}
                // With close as default
                action={key => (
                    <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
                        <Iconify icon="eva:close-fill" />
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
                mr: 1.5,
                width: 40,
                height: 40,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                justifyContent: 'center',
                color: `${color}.main`,
                bgcolor: theme => alpha(theme.palette[color].main, 0.16),
            }}
        >
            <Iconify icon={icon} width={28} />
        </Box>
    )
}
