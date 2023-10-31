// next
import Head from 'next/head'
// @mui
import { Container, Grid } from '@mui/material'
import UserController from 'controllers/userController'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { ApolloFormSchemaCustomValues } from 'src/components'
import CustomCard from 'src/components/CustomCard'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import NewEditForm from '../form/NewEditForm'

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Edicao() {
    const { themeStretch } = useSettingsContext()
    const { query } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar()

    const [customValues, setCustomValues] = useState<ApolloFormSchemaCustomValues[]>()
    const [areas, setAreas] = useState<string[]>()

    const loadData = async id => {
        setLoading(true)
        const userController = new UserController()
        const user = await userController.getById(id)
        if (!user) {
            enqueueSnackbar('Falha ao carregar dados do usuário', { variant: 'error', autoHideDuration: null })
            return
        }
        const areasIds: string[] = []
        user.areas.map(area => areasIds.push(area.id!))
        setAreas(areasIds)
        setCustomValues([
            { name: 'id', value: user.id },
            { name: 'fullname', value: user.fullname },
            { name: 'email', value: user.email },
            { name: 'cpf', value: user.cpf },
            { name: 'username', value: user.username },
            { name: 'role', value: user.role.id },
            { name: 'blocked', value: user.blocked },
        ])

        setLoading(false)
    }
    useEffect(() => {
        if (query.id && Number(query.id)) {
            loadData(query.id)
        }
    }, [query.id])

    return (
        <CustomCard>
            <Head>
                <title>Edição de usuário</title>
            </Head>
            {loading && <LoadingScreen />}
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid item xs={12}>
                    <HeaderBreadcrumbs
                        heading={'Usuários'}
                        links={[
                            {
                                name: 'Usuários',
                                href: '/usuarios',
                            },
                            { name: 'Edição' },
                        ]}
                    />
                </Grid>
                <NewEditForm editMode customValues={customValues} values={{}} areas={areas ? areas : []} />
            </Container>
        </CustomCard>
    )
}
