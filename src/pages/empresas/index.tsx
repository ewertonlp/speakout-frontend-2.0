// next
import Head from 'next/head'
// @mui
import { Button, Card, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Typography } from '@mui/material'
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
import NewEditForm from './form/NewEditForm'

// ----------------------------------------------------------------------

Empresas.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function Empresas() {
    const router = useRouter()
    const { themeStretch } = useSettingsContext()
    const [loading, setLoading] = useState(false)
    const [tenants, setTenants] = useState<ITenantGet[]>([])
    const [openModal, setOpenModal] = useState(false) 

    const getTenants = async () => {
        setLoading(true)
        const tenantController = new TenantController()
        try {
            const tenants = await tenantController.getAll({ status: true })
            tenants.forEach(tenant => (tenant.linkRelato = `https://${location.host}/ouvidoria/${tenant.identity}`))
            console.log(tenants)
            setTenants(tenants)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const disableTenant = async (id: string, data: any) => {
        const tenantController = new TenantController()
        try {
            const newData = {
                ...data,
                status: false,
            }
            await tenantController.update(newData, id)
        } catch (error) {}
    }

    const handleDelete = async (id: string) => {
        const data = {}; 
        await disableTenant(id, data);
    };

  

    useEffect(() => {
        getTenants()
    }, [])

    return (
        <>
            {loading && <LoadingScreen />}
            <Card sx={{ height: '100%', px: '1%', py: '18px' }}>
                <Head>
                    <title>Empresas | Canal Speakout</title>
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
                                                sx={{borderRadius: '25px', px: 4, py: 1.5}}
                                                startIcon={<Iconify icon="material-symbols:add" />}
                                                onClick={() => {
                                                    setOpenModal(true)
                                                }}
                                            >
                                                Adicionar empresa
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            />
                            <Divider/>
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
                                // removeFunction={disableTenant}
                                getItems={getTenants}
                                onDelete={handleDelete}
                                sx={{width: '100%', color: '#1D1D1E'}}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Card>
            <Dialog open={openModal} onClose={() => setOpenModal(false)} sx={{height:'100vh', py: '5rem'}}>
                <DialogTitle sx={{textAlign:"center"}} >
                    <Typography fontSize='1.5rem' fontWeight={600} color="gray">Cadastrar Nova Empresa</Typography>
                </DialogTitle>
                <DialogContent sx={{paddingBottom: '2rem'}}>
                    <NewEditForm /> 
                </DialogContent>
            </Dialog>
        </>
    )
}
