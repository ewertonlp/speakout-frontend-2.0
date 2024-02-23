import { Box, Card, Container, Grid, Typography } from '@mui/material'
import { TrainingController } from 'controllers/trainingController'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { useAuthContext } from 'src/auth/useAuthContext'
import Iconify from 'src/components/iconify/Iconify'
import LoadingScreen from 'src/components/loading-screen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import { ITraining } from 'types/ITraining'
//

const Treinamentos = () => {
    const { themeStretch } = useSettingsContext()
    const { tenantId } = useAuthContext()
    const [trainingData, setTrainingData] = useState<ITraining[]>([])
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(false)

    const getTraining = async () => {
        const trainingController = new TrainingController()
        try {
            setLoading(true)
            const response = await trainingController.getAll()
            setTrainingData(response.data)
            setStatus(response.data[0].Status)
        } catch (error) {
            console.error('Não foi possivel carregar os treinamentos', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!tenantId) {
            return
        }
        getTraining()
    }, [tenantId])

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
                                    {/* <Tabs value={value} onChange={handleChange} sx={{ marginBottom: '16px' }}>
                                        <Tab label="Documentos" style={{ fontSize: '1.15rem' }} />
                                        <Tab label="Vídeos" style={{ fontSize: '1.15rem' }} />
                                    </Tabs>
                                    <Divider /> */}

                                    {/* {value === 1 && (
                                        <Box sx={{ minWidth: 300, marginTop: 6, marginBottom: 4 }}>
                                            <p style={{ fontSize: '1.2rem' }}>Assédio Moral e Sexual</p>
                                            {videos.map((video, index) => (
                                                <ReactPlayer key={index} url={video.url} controls />
                                            ))}
                                        </Box>
                                    )} */}

                                    <Box sx={{ minWidth: 300, marginTop: 8, marginBottom: 4 }}>
                                        {loading ? (
                                            <p>Carregando...</p>
                                        ) : status === undefined ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexWrap: 'wrap',
                                                    backgroundColor: '#FFF5CC',
                                                    padding: '2rem',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <Iconify
                                                    icon="eva:alert-triangle-fill"
                                                    style={{ color: 'orange', width: '3rem', fontSize: '2rem' }}
                                                />
                                                <p
                                                    style={{
                                                        fontSize: '1.2rem',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    Entre em contato com a <strong> Equipe Speakout </strong> para
                                                    adquirir os treinamentos necessários.
                                                </p>
                                            </div>
                                        ) : (
                                            trainingData.map((item, index) => (
                                                <div key={index}>
                                                    <ReactPlayer
                                                        url={item.Link}
                                                        controls={false}
                                                        config={{
                                                            youtube: {
                                                                playerVars: { fs: 0 },
                                                            },
                                                        }}
                                                    />
                                                    <p style={{ fontSize: '1.2rem' }}>{item.Treinamento}</p>
                                                </div>
                                            ))
                                        )}
                                    </Box>
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
