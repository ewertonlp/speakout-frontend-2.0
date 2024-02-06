import { Box, Card, Container, Divider, Grid, Tab, Tabs, Typography } from '@mui/material'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
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

    const videos = [
        {
            title: 'Assédio Moral e Sexual',
            url: 'https://youtu.be/lGiqBQhBZNM',
        },
    ]

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
                    <Grid rowGap={{ xs: '15px', lg: '25px' }}>
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
                                    <Tabs value={value} onChange={handleChange} sx={{ marginBottom: '16px' }}>
                                        <Tab label="Documentos" style={{ fontSize: '1.15rem' }} />
                                        <Tab label="Vídeos" style={{ fontSize: '1.15rem' }} />
                                    </Tabs>
                                    <Divider />

                                    {value === 1 && (
                                        <Box sx={{ minWidth: 300, marginTop: 6, marginBottom: 4 }}>
                                            <p style={{ fontSize: '1.2rem' }}>Assédio Moral e Sexual</p>
                                            {videos.map((video, index) => (
                                                <ReactPlayer key={index} url={video.url} controls />
                                            ))}
                                        </Box>
                                    )}
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
