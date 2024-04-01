// next
import Head from 'next/head'
// @mui
import { Button, Card, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Typography } from '@mui/material'
import { AreaController } from 'controllers/areaController'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Iconify from 'src/components/iconify/Iconify'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable'
import { IArea } from 'types/IArea'
import NewEditForm from './form/NewEditForm'

// ----------------------------------------------------------------------

Areas.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function Areas() {
    const router = useRouter()
    const { themeStretch } = useSettingsContext()
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false) 
    const [areaFilters, setAreaFilters] = useState()
    const [areas, setAreas] = useState<IArea[]>([])

    function handleSetUserFilters(data: any) {
        setAreaFilters(data)
    }



    const { tenantId } = useAuthContext()

    const getAreas = async () => {
        try {
            setLoading(true)
            const areaController = new AreaController()
            const areas = await areaController.getAll()
            setAreas(areas.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!tenantId) {
            return
        }
        getAreas()
    }, [tenantId])

    return (
        <>
            <Card sx={{ height: '100%', px: '1%', py: '18px' }}>
                <Head>
                    <title>Áreas de atuação</title>
                </Head>
                {loading && <LoadingScreen />}
                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <HeaderBreadcrumbs
                                heading={'Área de atuação'}
                                links={[
                                    {
                                        name: 'Área de atuação',
                                        href: '/areasdeatuacao',
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
                                                Adicionar área
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            />
                            <Divider />
                        </Grid>
                        {/* <Grid item xs={12}> */}
                            {/* <AccordionFilter
                                schemaForm={UserFiltersFormSchema}
                                setFilters={handleSetUserFilters}
                                formData={userFilters}
                            /> */}
                        {/* </Grid> */}

                        <Grid item xs={7}>
                            <CrudTable
                                tableData={areas}
                                setTableData={setAreas}
                                tableLabels={[
                                    { id: 'description', label: 'Área de Atuação' },
                                    { id: 'action', label: 'Ações' },
                                ]}
                                sx={{width: '100%'}}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Card>
            <Dialog open={openModal} onClose={() => setOpenModal(false)} sx={{height:'100vh', py: '3rem'}}>
                <DialogTitle sx={{textAlign:"center"}} >
                    <Typography fontSize='1.5rem' fontWeight={600} color="text">Cadastrar Nova Empresa</Typography>
                </DialogTitle>
                <DialogContent sx={{paddingBottom: '2rem'}}>
                    <NewEditForm /> 
                </DialogContent>
            </Dialog>
        </>
    )
}
