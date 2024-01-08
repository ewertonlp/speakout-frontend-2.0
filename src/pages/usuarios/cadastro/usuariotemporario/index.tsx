// next
import Head from 'next/head'
// @mui
import { Container, Grid } from '@mui/material'
// layouts
// components
import React from 'react'
import CustomCard from 'src/components/CustomCard'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import NewUserTemp from '../../form/NewUserTemp'

// ----------------------------------------------------------------------

CadastroUserTemp.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function CadastroUserTemp() {
    const { themeStretch } = useSettingsContext()

    return (
        <CustomCard>
            <Head>
                <title>Cadastro de usuário temporário</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid item xs={12}>
                    <HeaderBreadcrumbs
                        heading={'Cadastro de Usuário Temporário'}
                        links={[
                            {
                                name: 'Usuários',
                                href: '/usuarios',
                            },
                            { name: 'Cadastro temporário' },
                        ]}
                    />
                </Grid>
                <Grid item xs={12}>
                    <NewUserTemp values={{}} />
                </Grid>
            </Container>
        </CustomCard>
    )
}
