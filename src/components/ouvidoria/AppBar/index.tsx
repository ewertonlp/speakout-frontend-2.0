import MenuIcon from '@mui/icons-material/Menu'
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Toolbar,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const drawerWidth = 240

export default function DrawerAppBar(props: { window?: () => Window; logoUrl: string }) {
    const { window, logoUrl } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const router = useRouter()
    const { query } = useRouter()
    const navItems = [
        { label: 'NOVA DENÚNCIA', path: `/ouvidoria/formulario?company=${query.company}` },
        { label: 'STATUS DA DENÚNCIA', path: `/ouvidoria/status-denuncia?company=${query.company}` },
    ]

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState)
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Grid onClick={() => router.push(`/ouvidoria/${query.company}`)}>
                {logoUrl && <Image src={logoUrl} alt="logo" width="150px" height="60px" />}
            </Grid>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center', }}>
                            <Link href={item.path}>
                                <a style={{ textDecoration: 'none', color: '#4D595A' }}> {item.label}</a>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ backgroundColor: 'white', padding: '20px 0' }}>
                <Toolbar>
                    <IconButton
                        color="success"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: 'black' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                        onClick={() => router.push(`/ouvidoria/${query.company}`)}
                    >
                        {logoUrl && <img width="150px" height="50px" src={logoUrl} alt="logo" />}
                    </Grid>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item, index) => (
                            <Link key={index} href={item.path} passHref>
                                <a style={{ textDecoration: 'none', color: '#4D595A' }}>
                                    <Button sx={{border: '1px solid #7EB353', ml:'1rem', borderRadius: '25px', padding:'8px 20px'}}>{item.label}</Button>
                                </a>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 0 }}>
                <Toolbar />
            </Box>
        </Box>
    )
}
