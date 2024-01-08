import { Box, Card, Container, Divider, Grid, Tab, Tabs, Typography } from '@mui/material'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import LoadingScreen from 'src/components/loading-screen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'

const Treinamentos = () => {
    const { themeStretch } = useSettingsContext()
    const { enqueueSnackbar } = useSnackbar()
    const { tenantId } = useAuthContext()
    const [value, setValue] = useState(0)

    const [loading, setLoading] = useState(false)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <Card sx={{ height: '100%', px: '1%', py: '15px' }}>
                <Head>
                    <title>Treinamentos</title>
                </Head>
                <Typography variant="h4" sx={{ margin: '20px' }}>
                    Treinamentos
                </Typography>
                {loading && <LoadingScreen />}
                <Container sx={{ marginTop: '20px' }} maxWidth={themeStretch ? false : 'xl'}>
                    <Grid rowGap={{ xs: '15px', lg: '25px' }} spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={6} xl={4}>
                            <Card
                                sx={{
                                    paddingX: '20px',
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                    borderRadius: 'none',
                                }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Tabs value={value} onChange={handleChange} centered sx={{ marginBottom: '16px' }}>
                                        <Tab label="Documentos" />
                                        <Tab label="Vídeos" />
                                    </Tabs>
                                    <Divider />
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Card>
        </>
    )
}

Treinamentos.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default Treinamentos
