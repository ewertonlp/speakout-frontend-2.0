// next
import Head from 'next/head'
// @mui
import { Container, Grid } from '@mui/material'
// layouts
// components
import TenantController from 'controllers/tenantController'
import { useRouter } from 'next/router'
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
    const [customValues, setCustomValues] = useState<ApolloFormSchemaCustomValues[]>()
    const [currentLogoId, setCurrentLogoId] = useState<string>()
    const [currentBannerId, setCurrentBannerId] = useState<string>()

    const loadData = async id => {
        setLoading(true)
        const tenantController = new TenantController()
        try {
            const tenant = await tenantController.getById(id)
            setCustomValues([
                { name: 'id', value: tenant.id },
                { name: 'linkcondutecode', value: tenant.linkcondutecode },
                { name: 'subtitle_banner', value: tenant.subtitle_banner },
                { name: 'title_banner', value: tenant.title_banner },
                { name: 'description', value: tenant.description },
                { name: 'status', value: tenant.status },
                { name: 'identity', value: tenant.identity },
            ])
            if (tenant.logo) setCurrentLogoId(tenant.logo.id)
            if (tenant.banner) setCurrentBannerId(tenant.banner.id)
        } catch (error) {}

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
                <title>Edição de empresa</title>
            </Head>
            {loading && <LoadingScreen />}
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid item xs={12}>
                    <HeaderBreadcrumbs
                        heading={'Empresas'}
                        links={[
                            {
                                name: 'Empresas',
                                href: '/empresas',
                            },
                            { name: 'Edição' },
                        ]}
                    />
                </Grid>
                <Grid item xs={12}>
                    <NewEditForm
                        customValues={customValues}
                        currentLogoId={currentLogoId}
                        currentBannerId={currentBannerId}
                        values={{}}
                    />
                </Grid>
            </Container>
        </CustomCard>
    )
}
