import { Alert, Box, Card, Grid, Link, Stack, Typography } from '@mui/material'
import AuthController from 'controllers/authController'
import Head from 'next/head'
import NextLink from 'next/link'
import { useState } from 'react'
import { LoginProps } from 'services/requests/usersAuth/types'
import ApolloForm, {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaItem,
} from 'src/components/apollo-form/ApolloForm.component'

import { Imessage } from 'types/Imessage'

// ----------------------------------------------------------------------

export default function Login() {
    return (
        <Grid
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'card.default',
                padding: 0,
            }}
        >
            <Head>
                <title>Login</title>
            </Head>
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: { sm: 'row', xs: 'column' },
                    paddingTop: { xs: '20px', sm: '0px' },
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <Grid
                    item
                    xs={6}
                    sx={{ backgroundColor: '#F0F2F5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Box
                        sx={{
                            height: { sm: '100vh', xs: '50vh' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: { xs: '50%', sm: '35%' },
                            backgroundColor: '#F0F2F5',
                        }}
                    >
                        <Typography sx={{ color: '#2D7999', mb: '1rem', textAlign:'center' }} variant="h3">
                            Sistema de Relatos
                        </Typography>
                        <img
                            src="/logo/logo_speakout.svg"
                            alt="Logo Speakout"
                            // style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover',  }}
                        />
                    </Box>
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
                    <Card sx={{ maxWidth: '550px', border: '1px solid #adadad', my: 5 }}>
                        <Grid p={3}>
                            <Stack spacing={2} sx={{ mb: 1, mt: 1, position: 'relative' }}>
                                <Typography variant="h3" textAlign="center">
                                    Login
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                    sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}
                                >
                                    {/* <Typography variant="body2">Não possui conta?</Typography>
                                    <NextLink href={'/register'} passHref>
                                        <Link variant="subtitle2">Faça o cadastro</Link>
                                    </NextLink> */}
                                </Stack>
                            </Stack>

                            <AuthLoginForm />
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

function AuthLoginForm() {
    const [message, setMesssage] = useState<Imessage | null>(null)

    const onSubmit = async (data: LoginProps) => {
        const authController = new AuthController()
        try {
            await authController.login(data)
        } catch (error) {
            setMesssage({ text: 'Usuário e/ou senha incorretos', severity: 'error' })
        }
    }

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'identifier',
            label: 'E-mail',
            ui: { grid: 12 },
            componenttype: ApolloFormSchemaComponentType.TEXT,
            required: true,
        },
        {
            name: 'password',
            label: 'Senha',
            ui: { grid: 12 },
            componenttype: ApolloFormSchemaComponentType.PASSWORD,
            required: true,
        },
    ]

    return (
        <>
            <Stack spacing={2} sx={{ marginBottom: 3 }}>
                {message && (
                    <Alert severity={message.severity} sx={{ fontSize: '1.2rem' }}>
                        {message.text}
                    </Alert>
                )}
            </Stack>

            <ApolloForm
                schema={formSchema}
                onSubmit={onSubmit}
                submitButtonText="Entrar"
                defaultExpandedGroup={false}
                noRenderCardInForm
            />

            <Stack alignItems="center" sx={{ mt: 6, pb: { xs: '2rem' } }}>
                <NextLink href={'/forgot-password'} passHref>
                    <Link variant="body2" color="#2D7999" underline="always">
                        Esqueceu sua senha?
                    </Link>
                </NextLink>
            </Stack>
        </>
    )
}
