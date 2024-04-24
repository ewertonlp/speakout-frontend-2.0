// @mui
import {
    AppBar,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
// utils
import { bgBlur } from '../../../utils/cssStyles'
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop'
import useResponsive from '../../../hooks/useResponsive'
// config
import { HEADER, NAV } from '../../../config'
// components
import Iconify from '../../../components/iconify/Iconify'
import Logo from '../../../components/logo'
import { useSettingsContext } from '../../../components/settings'
//

import TenantController from 'controllers/tenantController'
import UserController from 'controllers/userController'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import NoticeModal from 'src/components/NoticeModal'
import { ITenantGet } from 'types/ITenant'
import AccountPopover from './AccountPopover'

import ThemeToggle from 'src/components/themeButton/themeButton'

// ----------------------------------------------------------------------

type Props = {
    onOpenNav?: VoidFunction
}



export default function Header({ onOpenNav }: Props) {
    const theme = useTheme()

    const { themeLayout } = useSettingsContext()
    const { themeMode, onToggleMode } = useSettingsContext()

    const isNavHorizontal = themeLayout === 'horizontal'

    const isNavMini = themeLayout === 'mini'

    const isDesktop = useResponsive('up', 'lg')

    const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal

    const [openModal, setOpenModal] = useState(false)

    const [selectValue, setSelectValue] = useState<{ label: string; value: string }>()

    const { setTenantId, tenantId, user } = useAuthContext()

    const { push, asPath } = useRouter()

    const handleChange = async (event: SelectChangeEvent) => {
        setOpenModal(true)
        const tenantName = tenants.find(tenant => tenant.id === event.target.value)?.description
        setSelectValue({ value: event.target.value as string, label: tenantName ?? '' })
    }

    const [tenants, setTenants] = useState<ITenantGet[]>([])

    useEffect(() => {
        const listtenants = async () => {
            const tenantController = new TenantController()
            try {
                const data = await tenantController.getAll({ status: true })
                setTenants(data)
            } catch (error) {
                console.log(error)
            }
        }

        listtenants()
    }, [])

    const isMainPage = (path: string) => {
        switch (path) {
            case '/relatorios/':
                return true
            case '/relatos/':
                return true
            case '/home/':
                return true
            case '/usuarios/':
                return true
            case '/areasdeatuacao/':
                return true
            case '/empresas/':
                return true
            case '/treinamentos/':
                return true
            default:
                return false
        }
    }

    const handleModalOkButton = async () => {
        const userController = new UserController()
        try {
            if (user && selectValue) {
                await userController.updateTenant({ tenant: selectValue.value }, user?.id)
                setTenantId(selectValue.value)
                console.log(asPath)
                if (!isMainPage(asPath)) push('/relatos')
            }
        } catch (error) {}
        setOpenModal(false)
    }

    const renderContent = (
        <>
            {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

            {!isDesktop && (
                <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>
            )}

            <Stack
                flexGrow={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={{ xs: 1.5, sm: 1.5 }}
            >
                <Typography variant="h5" sx={{ color: 'text.primary' }}>
                    Olá {user?.fullname}
                </Typography>

                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                    {user?.role?.type === 'admin' && (
                        <FormControl sx={{ width: '60%', marginTop: { xs: '8px', lg: '0px' } }}>
                            <InputLabel id="select-label">Empresa</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={tenantId}
                                label="Empresa"
                                onChange={handleChange}
                                sx={{ borderRadius: '10px', paddingLeft: '0.3rem', backgroundColor:'card.default' }}
                            >
                                {tenants.map(tenant => (
                                    <MenuItem key={tenant.id} value={tenant.id!}>
                                        {tenant.description}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <ThemeToggle themeMode={themeMode} onToggleMode={onToggleMode} />
                    
                    {/* <NotificationsPopover /> */}
                    <AccountPopover />
                    <NoticeModal
                        open={openModal}
                        setOpen={setOpenModal}
                        handleOk={handleModalOkButton}
                        text={
                            selectValue?.label
                                ? `Tem certeza que deseja trocar para a empresa ${selectValue.label}?`
                                : 'Tem certeza que deseja trocar de empresa?'
                        }
                        title="Aviso"
                    />
                </Stack>
            </Stack>
        </>
    )

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,

                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(isDesktop && {
                    width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
                    height: HEADER.H_DASHBOARD_DESKTOP,
                    bgcolor: 'background.default',
                    ...(isOffset && {
                        height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
                    }),
                    ...(isNavHorizontal && {
                        width: 1,
                        bgcolor: 'background.default',
                        height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
                        borderBottom: theme => `dashed 1px ${theme.palette.divider}`,
                    }),
                    ...(isNavMini && {
                        width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
                    }),
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {renderContent}
            </Toolbar>
        </AppBar>
    )
}
