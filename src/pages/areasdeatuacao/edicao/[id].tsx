// next
import Head from 'next/head'
// @mui
import { Container, Divider, Grid } from '@mui/material'
import { AreaController } from 'controllers/areaController'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { ApolloFormSchemaCustomValues } from 'src/components'
import CustomCard from 'src/components/CustomCard'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import { IArea } from 'types/IArea'
import NewEditForm from '../form/NewEditForm'
import { useTheme } from '@mui/material/styles'

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Edicao() {
    const { themeStretch } = useSettingsContext()
    const { query } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar()
    const [initialValues, setInitialValues] = useState<IArea>()
    const [openModal, setOpenModal] = useState(false)
    const theme = useTheme()

    const [customValues, setCustomValues] = useState<ApolloFormSchemaCustomValues[]>()

    const loadData = async id => {
        setLoading(true)
        const areaController = new AreaController()
        const area = await areaController.getById(id)
        if (!area) {
            enqueueSnackbar('Falha ao carregar dados da área de atuação', { variant: 'error', autoHideDuration: null })
            return
        }
        setCustomValues([
            { name: 'id', value: area.data.id! },
            { name: 'description', value: area.data.description },
        ])
        setLoading(false)
    }
    useEffect(() => {
        if (query.id && Number(query.id)) {
            loadData(query.id)
        }
    }, [query.id])

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    return (
        <CustomCard>
            <Head>
                <title>Editar área de atuação</title>
            </Head>
            {loading && <LoadingScreen />}
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid item xs={12}>
                    <HeaderBreadcrumbs
                        heading={'Áreas de atuação'}
                        links={[
                            {
                                name: 'Áreas de atuação',
                                href: '/areasdeatuacao',
                            },
                            { name: 'Edição' },
                        ]}
                    />
                </Grid>
                <Divider />
                <Grid
                    xs={6}
                    sx={{
                        maxWidth: '800px',
                        margin: '10rem auto',
                        border: `1px solid ${borderColor}`,
                        borderRadius: '10px',
                        padding: '4rem 2rem',
                        backgroundColor: 'card.default',
                        transition: 'all 0.2s ease-out',
                        '&:hover': {
                            boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
                        },
                    }}
                >
                    <NewEditForm />
                </Grid>
            </Container>
        </CustomCard>
    )
}
