// next
import { Container, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { PostController } from 'controllers/postController'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import LoadingScreen from 'src/components/loading-screen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import BarChart from 'src/sections/@dashboard/general/analytics/BarChart'
import PizzaChart from 'src/sections/@dashboard/general/analytics/PizzaChart'
import { IPostListing } from 'types/IPostListing'

// ----------------------------------------------------------------------

GeneralAnalyticsPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function GeneralAnalyticsPage() {
    const theme = useTheme()

    const { themeStretch } = useSettingsContext()

    const { user, tenantId } = useAuthContext()

    const [loading, setLoading] = useState(true)

    const { enqueueSnackbar } = useSnackbar()

    const [statusData, setStatusData] = useState({
        Novos: 0,
        'Em andamento': 0,
        'Finalizado procedente': 0,
        'Finalizado improcedente': 0,
    })

    const [relationWithCompanyData, setRelationWithCompanyData] = useState({
        colaborador: 0,
        'ex-colaborador': 0,
        cliente: 0,
        'fornecedor-prestador-credenciado': 0,
        comunidade: 0,
        especificar: 0,
    })

    const [typeOfComplaintData, setTypeOfComplaintData] = useState({
        Assédio: 0,
        Violência: 0,
        Discriminação: 0,
        Favorecimento: 0,
        'Subtração de bens ou dinheiro': 0,
        'Utilização indevida': 0,
        'Meio ambiente': 0,
        Falsificação: 0,
        Perigos: 0,
        Conduta: 0,
        Relações: 0,
        Outros: 0,
    })

    const [identifiedData, setIdentifiedData] = useState({
        identified: 0,
        notIdentified: 0,
    })

    const [thereWasAWitnessData, setThereWasAWitnessData] = useState({
        thereWas: 0,
        thereWasnt: 0,
    })

    const getData = async () => {
        setLoading(true)
        const postController = new PostController()
        try {
            let count
            count = await postController.getAllNovo()
            setStatusData(prev => ({ ...prev, Novos: count }))

            count = await postController.getAllEmProgresso()
            setStatusData(prev => ({ ...prev, 'Em andamento': count }))

            count = await postController.getAllConcluidoProcedente()
            setStatusData(prev => ({ ...prev, 'Finalizado procedente': count }))

            count = await postController.getAllConcluidoImprocedente()
            setStatusData(prev => ({ ...prev, 'Finalizado improcedente': count }))

            const posts = await postController.getAll()
            getRelationWithCompanyData(posts)
            getTypeOfComplaintData(posts)
            getIdentifiedData(posts)
            getThereWasAWitnessData(posts)
        } catch (error) {
            enqueueSnackbar('Ops! Erro ao recuperar dados', { autoHideDuration: 5000 })
        }
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [tenantId])

    const getIdentifiedData = (posts: IPostListing[]) => {
        const identifiedData = {
            identified: 0,
            notIdentified: 0,
        }

        posts.map(post => {
            if (post.response.identificacao == 'true') {
                identifiedData.identified++
            } else {
                identifiedData.notIdentified++
            }
        })
        setIdentifiedData(identifiedData)
    }

    const getThereWasAWitnessData = (posts: IPostListing[]) => {
        const thereWasAWitnessData = {
            thereWas: 0,
            thereWasnt: 0,
        }
        posts.map(post => {
            if (post.response['testemunhas-ocorrencia'] === 'sim') {
                thereWasAWitnessData.thereWas++
            } else {
                thereWasAWitnessData.thereWasnt++
            }
        })
        setThereWasAWitnessData(thereWasAWitnessData)
    }

    const getRelationWithCompanyData = (posts: IPostListing[]) => {
        const relationWithCompanyData = {
            colaborador: 0,
            'ex-colaborador': 0,
            cliente: 0,
            'fornecedor-prestador-credenciado': 0,
            comunidade: 0,
            especificar: 0,
        }
        posts.map(post => {
            relationWithCompanyData[post.response.relacao]++
        })

        setRelationWithCompanyData(relationWithCompanyData)
    }

    const getTypeOfComplaintData = (posts: IPostListing[]) => {
        const typeOfComplaintData = {
            Assédio: 0,
            Violência: 0,
            Discriminação: 0,
            Favorecimento: 0,
            'Subtração de bens ou dinheiro': 0,
            'Utilização indevida': 0,
            'Meio ambiente': 0,
            Falsificação: 0,
            Perigos: 0,
            Conduta: 0,
            Relações: 0,
            Outros: 0,
        }
        posts.map(post => {
            typeOfComplaintData[post.response['tipo-denuncia'].group]++
        })

        setTypeOfComplaintData(typeOfComplaintData)
    }

    if (loading) return <LoadingScreen />

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Oi, {user?.fullname}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <PizzaChart
                            title="Status"
                            chart={{
                                series: [
                                    { label: 'Novo', value: statusData.Novos },
                                    { label: 'Em andamento', value: statusData['Em andamento'] },
                                    { label: 'Finalizado procedente', value: statusData['Finalizado procedente'] },
                                    {
                                        label: 'Finalizado improcedente',
                                        value: statusData['Finalizado improcedente'],
                                    },
                                ],
                                colors: [
                                    theme.palette.primary.main,
                                    theme.palette.info.main,
                                    theme.palette.error.main,
                                    theme.palette.warning.main,
                                ],
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <PizzaChart
                            title="Denunciante se identificou"
                            chart={{
                                series: [
                                    { label: 'Anônimo', value: identifiedData.notIdentified },
                                    { label: 'Identificado', value: identifiedData.identified },
                                ],
                                colors: [theme.palette.info.main, theme.palette.warning.main],
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <PizzaChart
                            title="Havia testemunhas"
                            chart={{
                                series: [
                                    { label: 'Sim', value: thereWasAWitnessData.thereWas },
                                    { label: 'Não', value: thereWasAWitnessData.thereWasnt },
                                ],
                                colors: [theme.palette.info.main, theme.palette.error.main],
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <BarChart
                            title="Relação com a empresa"
                            chart={{
                                series: [
                                    {
                                        label: 'Colaborador da empresa',
                                        value: relationWithCompanyData['colaborador'],
                                    },
                                    {
                                        label: 'Ex-colaborador da empresa',
                                        value: relationWithCompanyData['ex-colaborador'],
                                    },
                                    { label: 'Cliente da empresa', value: relationWithCompanyData['cliente'] },
                                    {
                                        label: 'Fornecedor / Prestador / Credenciado da empresa',
                                        value: relationWithCompanyData['fornecedor-prestador-credenciado'],
                                    },
                                    {
                                        label: 'Comunidade no entorno da empresa',
                                        value: relationWithCompanyData['comunidade'],
                                    },
                                    { label: 'Outros', value: relationWithCompanyData['especificar'] },
                                ],
                                colors: [
                                    theme.palette.info.main,
                                    theme.palette.info.main,
                                    theme.palette.info.main,
                                    theme.palette.info.main,
                                    theme.palette.info.main,
                                    theme.palette.info.main,
                                ],
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <BarChart
                            title="Tipos de denúncia"
                            chart={{
                                series: [
                                    {
                                        label: 'Assédio',
                                        value: typeOfComplaintData['Assédio'],
                                    },
                                    {
                                        label: 'Conduta',
                                        value: typeOfComplaintData['Conduta'],
                                    },
                                    {
                                        label: 'Discriminação',
                                        value: typeOfComplaintData['Discriminação'],
                                    },
                                    {
                                        label: 'Falsificação',
                                        value: typeOfComplaintData['Falsificação'],
                                    },
                                    {
                                        label: 'Favorecimento',
                                        value: typeOfComplaintData['Favorecimento'],
                                    },
                                    {
                                        label: 'Meio ambiente',
                                        value: typeOfComplaintData['Meio ambiente'],
                                    },
                                    {
                                        label: 'Assédio',
                                        value: typeOfComplaintData['Perigos'],
                                    },
                                    {
                                        label: 'Falsificação',
                                        value: typeOfComplaintData['Falsificação'],
                                    },
                                    {
                                        label: 'Violência',
                                        value: typeOfComplaintData['Violência'],
                                    },
                                    {
                                        label: 'Utilização indevida',
                                        value: typeOfComplaintData['Utilização indevida'],
                                    },
                                    {
                                        label: 'Relações com a comunidade ou setor público',
                                        value: typeOfComplaintData['Relações'],
                                    },
                                    {
                                        label: 'Outros',
                                        value: typeOfComplaintData['Outros'],
                                    },
                                ],
                                colors: [
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                    theme.palette.warning.main,
                                ],
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
