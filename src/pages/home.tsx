// next
import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { PostController } from 'controllers/postController'
import TenantController from 'controllers/tenantController'
import * as htmlToImage from 'html-to-image'
import jsPDF from 'jspdf'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import LoadingScreen from 'src/components/loading-screen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import BarChart from 'src/sections/@dashboard/general/analytics/BarChart'
import PizzaChart from 'src/sections/@dashboard/general/analytics/PizzaChart'
import { ChartData } from 'types/IChartData'
import { IPostListing } from 'types/IPostListing'
import { ITenantGet } from 'types/ITenant'

import 'styles/CustomChart.module.css'

// ----------------------------------------------------------------------

GeneralAnalyticsPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    chartContainer: {
        transition: 'box-shadow 0.2s ease-out',
        borderRadius: '30px',
        backgroundColor: 'background.default',
        '&:hover': {
            boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
        },
    },
}))

export default function GeneralAnalyticsPage() {
    const theme = useTheme()

    const { themeStretch } = useSettingsContext()
    const [tenants, setTenants] = useState<ITenantGet[]>([])
    const { user, tenantId } = useAuthContext()

    const cardShadow = useStyles()

    const [loading, setLoading] = useState(true)

    const { enqueueSnackbar } = useSnackbar()

    const chartStatus = useRef(null)
    const chartIdentificacao = useRef(null)
    const chartTestemunhas = useRef(null)
    const chartRelacaoEmpresa = useRef(null)
    const chartTipoDenuncia = useRef(null)

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

    const listTenants = async () => {
        const tenantController = new TenantController()
        try {
            const data = await tenantController.getAll({ status: true })
            setTenants(data)
        } catch (error) {
            console.log(error)
        }
    }

    const [totalPosts, setTotalPosts] = useState(0)
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
            setTotalPosts(posts.length)
            getRelationWithCompanyData(posts)
            getTypeOfComplaintData(posts)
            getIdentifiedData(posts)
            getThereWasAWitnessData(posts)
        } catch (error) {
            enqueueSnackbar('Ops! Erro ao recuperar dados', { autoHideDuration: 5000 })
        }
        setLoading(false)
    }

    const [chartUrl, setChartUrl] = useState<string | null>(null)
    const [isPDFGenerated, setIsPDFGenerated] = useState(false)
    const [chartData, setChartData] = useState<ChartData>({
        statusData: {
            Novos: 0,
            'Em andamento': 0,
            'Finalizado procedente': 0,
            'Finalizado improcedente': 0,
        },
        relationWithCompanyData: {
            colaborador: 0,
            'ex-colaborador': 0,
            cliente: 0,
            'fornecedor-prestador-credenciado': 0,
            comunidade: 0,
            especificar: 0,
        },
        typeOfComplaintData: {
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
        },
        identifiedData: {
            identified: 0,
            notIdentified: 0,
        },
        thereWasAWitnessData: {
            thereWas: 0,
            thereWasnt: 0,
        },
    })

    const updateChartData = data => {
        setChartData(data)
    }

    useEffect(() => {
        getData()
        listTenants()
        updateChartData(chartData)

        const fetchData = async () => {
            try {
                await getData()
                await updateChartData({
                    statusData,
                    relationWithCompanyData,
                    typeOfComplaintData,
                    getIdentifiedData,
                    thereWasAWitnessData,
                })
            } catch (error) {
                console.error('Erro ao obter os dados:', error)
            }
        }

        const fetchDataAndLog = async () => {
            try {
                await fetchData()
                console.log('Dados atualizados com sucesso!')
            } catch (error) {
                console.error('Erro ao atualizar os dados:', error)
            }
        }

        fetchDataAndLog()
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

    async function exportGraficosParaPDF() {
        try {
            const doc = new jsPDF('l', 'px')
            const elements = document.getElementsByClassName('custom-chart')
            await creatPdf({ doc, elements })
            doc.save('graficos.pdf')
            enqueueSnackbar('PDF gerado com sucesso, verifique sua pasta de Downloads.', { variant: 'success' })
        } catch (error) {
            console.error('Ocorreu um erro ao exportar os gráficos para PDF:', error)
            enqueueSnackbar('Erro ao gerar PDF, tente novamente!', { variant: 'error' })
        }
    }

    async function creatPdf({ doc, elements }: { doc: jsPDF; elements: HTMLCollectionOf<Element> }) {
        let top = 32
        const padding = 16

        for (let i = 0; i < elements.length; i++) {
            const el = elements.item(i) as HTMLElement
            const imgData = await htmlToImage.toPng(el, { width: 1560, height: 1300 })

            let elHeight = el.offsetHeight
            let elWidth = el.offsetWidth

            const pageWidth = doc.internal.pageSize.getWidth()

            if (elWidth > pageWidth) {
                const ratio = pageWidth / elWidth
                elHeight = elHeight * ratio - padding
                elWidth = elWidth * ratio - padding
            }

            const pageHeight = doc.internal.pageSize.getHeight()

            if (top + elHeight > pageHeight) {
                doc.addPage()
                top = 16
            }

            doc.addImage(imgData, 'PNG', padding, top, elWidth, elHeight, `image${i}`)
            top += elHeight
        }
    }

    if (loading) return <LoadingScreen />

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    return (
        <>
            <Head>
                <title>Dashboard | Speakout</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid
                    container
                    // spacing={1}
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '2rem',
                        paddingBottom: '3rem',
                    }}
                >
                    <Typography variant="h4">Dashboard</Typography>
                    <Grid item>
                        <Link
                            href="/relatos"
                            sx={{
                                borderRadius: '30px',
                                color: '#fff',
                                backgroundColor: '#7EB353',
                                padding: '0.75rem 1.5rem',
                                transition: 'all 0.2s ease-out',
                                '&:hover': {
                                    backgroundColor: '#587D3A',
                                    textDecoration: 'none',
                                },
                            }}
                        >
                            Ir para os Relatos
                        </Link>
                    </Grid>
                </Grid>
                <Divider sx={{ mb: 5 }} />

                <div className="custom-chart">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <div className={cardShadow.chartContainer}>
                                <PizzaChart
                                    title="Status"
                                    // ref={chartStatus}
                                    chart={{
                                        series: [
                                            { label: 'Novo', value: statusData.Novos },
                                            { label: 'Em andamento', value: statusData['Em andamento'] },
                                            {
                                                label: 'Finalizado procedente',
                                                value: statusData['Finalizado procedente'],
                                            },
                                            {
                                                label: 'Finalizado improcedente',
                                                value: statusData['Finalizado improcedente'],
                                            },
                                        ],
                                        colors: [
                                            theme.palette.primary.dark,
                                            theme.palette.info.dark,
                                            theme.palette.error.dark,
                                            theme.palette.warning.main,
                                        ],
                                    }}
                                    style={{
                                        backgroundColor: theme.palette.background.paper,
                                        border: `1px solid ${borderColor}`,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <div className={cardShadow.chartContainer}>
                                <PizzaChart
                                    title="Denunciante se identificou"
                                    // ref={chartIdentificacao}
                                    chart={{
                                        series: [
                                            { label: 'Anônimo', value: identifiedData.notIdentified },
                                            { label: 'Identificado', value: identifiedData.identified },
                                        ],
                                        colors: [theme.palette.info.dark, theme.palette.warning.main],
                                    }}
                                    style={{
                                        backgroundColor: theme.palette.background.paper,
                                        border: `1px solid ${borderColor}`,
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <div className={cardShadow.chartContainer}>
                                <PizzaChart
                                    title="Havia testemunhas"
                                    // ref={chartTestemunhas}
                                    chart={{
                                        series: [
                                            { label: 'Sim', value: thereWasAWitnessData.thereWas },
                                            { label: 'Não', value: thereWasAWitnessData.thereWasnt },
                                        ],
                                        colors: [theme.palette.info.dark, theme.palette.error.dark],
                                    }}
                                    style={{
                                        backgroundColor: theme.palette.background.paper,
                                        border: `1px solid ${borderColor}`,
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <div className={cardShadow.chartContainer}>
                                <BarChart
                                    title="Relação com a empresa"
                                    // ref={chartRelacaoEmpresa}
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
                                            theme.palette.info.dark,
                                            theme.palette.info.dark,
                                            theme.palette.info.dark,
                                            theme.palette.info.dark,
                                            theme.palette.info.dark,
                                            theme.palette.info.dark,
                                        ],
                                    }}
                                    style={{
                                        backgroundColor: theme.palette.background.paper,
                                        border: `1px solid ${borderColor}`,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <div className={cardShadow.chartContainer}>
                                <BarChart
                                    title="Tipos de denúncia"
                                    // ref={chartTipoDenuncia}
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
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                            theme.palette.error.main,
                                        ],
                                    }}
                                    style={{
                                        backgroundColor: theme.palette.background.paper,
                                        border: `1px solid ${borderColor}`,
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <Grid
                    container
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: 5,
                        backgroundColor: 'card.default',
                        padding: '2rem',
                        borderRadius: '15px',
                        border: `1px solid ${borderColor}`,
                    }}
                >
                    <Grid item>
                        <Typography sx={{ color: `${theme.palette.text.secondary}`, fontSize: '1.2rem' }}>
                            Total de relatos:{' '}
                            <span style={{ color: `${theme.palette.text.primary}` }}>{totalPosts}</span>
                        </Typography>
                    </Grid>
                    <Grid>
                        <>
                            <Button
                                onClick={exportGraficosParaPDF}
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: '30px', padding:'0.5rem 1rem' }}
                            >
                                Exportar para PDF
                            </Button>
                        </>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
