// next
import Head from 'next/head'
// @mui
import { Button, Card, Container, Grid } from '@mui/material'
import TenantController from 'controllers/tenantController'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Iconify from 'src/components/iconify/Iconify'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable'
import { ITenantGet } from 'types/ITenant'

// ----------------------------------------------------------------------

Empresas.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function Empresas() {
    const router = useRouter()
    const { themeStretch } = useSettingsContext()

    const [loading, setLoading] = useState(false)
    const [tenants, setTenants] = useState<ITenantGet[]>([])

    const getTenants = async () => {
        setLoading(true)
        const tenantController = new TenantController()
        try {
            const tenants = await tenantController.getAll({ status: true })
            tenants.forEach(tenant => (tenant.linkRelato = `http://${location.host}/ouvidoria/${tenant.identity}`))
            setTenants(tenants)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const disableTenant = async (data: any, id: string) => {
        const tenantController = new TenantController()
        try {
            const newData = {
                ...data,
                status: false,
            }
            await tenantController.update(newData, id)
        } catch (error) {}
    }

    useEffect(() => {
        getTenants()
    }, [])

    return (
        <>
            {loading && <LoadingScreen />}
            <Card sx={{ height: '100%', px: '1%', py: '18px' }}>
                <Head>
                    <title>Empresas</title>
                </Head>

                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <HeaderBreadcrumbs
                                heading={'Empresas'}
                                links={[
                                    {
                                        name: 'Empresas',
                                        href: '/empresas',
                                    },
                                    { name: 'Lista' },
                                ]}
                                action={
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                startIcon={<Iconify icon="material-symbols:add" />}
                                                onClick={() => {
                                                    router.push('/empresas/cadastro')
                                                }}
                                            >
                                                Adicionar empresa
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <AccordionFilter
                                schemaForm={BusinessFilterFormSchema}
                                setFilters={handleSetBusinessFilters}
                                formData={businessFilters}
                            />
                        </Grid> */}

                        <Grid item xs={12}>
                            <CrudTable
                                tableData={tenants}
                                setTableData={setTenants}
                                tableLabels={[
                                    { id: 'description', label: 'Descrição' },
                                    { id: 'status', label: 'Status' },
                                    { id: 'linkRelato', label: 'Link relato', link: true },
                                    { id: 'action', label: 'Ações' },
                                ]}
                                removeFunction={disableTenant}
                                getItems={getTenants}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Card>
        </>
    )
}
