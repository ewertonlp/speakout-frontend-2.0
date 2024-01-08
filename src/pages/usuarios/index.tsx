// next
import Head from 'next/head'
// @mui
import { Button, Card, Container, Grid } from '@mui/material'
import UserController from 'controllers/userController'
import { UserFiltersFormSchema } from 'formSchemas/userFormSchema'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import AccordionFilter from 'src/components/AccordionFilter'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Iconify from 'src/components/iconify/Iconify'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable'
import { IDashUser, IDashUserFilter } from 'types/IDashUser'

// ----------------------------------------------------------------------

Usuarios.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function Usuarios() {
    const router = useRouter()
    const { themeStretch } = useSettingsContext()

    const [userFilters, setUserFilters] = useState<IDashUserFilter>()

    function handleSetUserFilters(data: IDashUserFilter) {
        setUserFilters(data)
    }

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<IDashUser[]>([])

    const { tenantId } = useAuthContext()

    const getUsers = async () => {
        setLoading(true)
        try {
            const userController = new UserController()
            const users = await userController.getAll(userFilters)
            users.sort(function (a, b) {
                if (a.fullname < b.fullname) {
                    return -1
                }
                if (a.fullname > b.fullname) {
                    return 1
                }
                return 0
            })
            setUsers(users)
        } catch (error) {}
        setLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, [tenantId, userFilters])

    return (
        <>
            <Card sx={{ height: '100%', px: '1%', py: '18px' }}>
                <Head>
                    <title>Usuários</title>
                </Head>
                {loading && <LoadingScreen />}
                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <HeaderBreadcrumbs
                                heading={'Usuários'}
                                links={[
                                    {
                                        name: 'Usuários',
                                        href: '/usuarios',
                                    },
                                    { name: 'Lista' },
                                ]}
                                action={
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                startIcon={<Iconify icon="material-symbols:add" />}
                                                onClick={() => {
                                                    router.push('/usuarios/cadastro')
                                                }}
                                            >
                                                Cadastrar usuário
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="soft"
                                                startIcon={<Iconify icon="material-symbols:add" />}
                                                onClick={() => {
                                                    router.push('/usuarios/cadastro/usuariotemporario')
                                                }}
                                            >
                                                Cadastrar usuário temporário
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AccordionFilter
                                schemaForm={UserFiltersFormSchema}
                                setFilters={handleSetUserFilters}
                                formData={userFilters}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CrudTable
                                tableData={users}
                                setTableData={setUsers}
                                tableLabels={[
                                    { id: 'fullname', label: 'Nome' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'cpf', label: 'CPF' },
                                    { id: 'action', label: 'Ações' },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Card>
        </>
    )
}
