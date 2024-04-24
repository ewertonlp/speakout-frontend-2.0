import { Alert, Box, Card, Grid, Link, Stack, Typography } from '@mui/material'
import AuthController from 'controllers/authController'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ApolloForm } from 'src/components'
import { ApolloFormSchemaComponentType, ApolloFormSchemaItem } from 'src/components/apollo-form/ApolloForm.component'
import { IRegisterForm } from 'types/IAuth'
import { Imessage } from 'types/Imessage'

//

// ----------------------------------------------------------------------

export default function Register() {
    return (
        <Grid
            sx={{
                height: '100%',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                backgroundColor: 'card.default',
            }}
        >
            <Head>
                <title>Cadastro de Usuário Admin Canal Speakout</title>
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
                            margin: { xs: '0 auto', sm: '0px' },
                            backgroundColor: '#F0F2F5',
                        }}
                    >
                        <Typography sx={{ color: '#2D7999', mb: '2rem' }} variant="h3">
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
                    <Card sx={{ maxWidth: '700px', border: '1px solid #adadad', my: 5 }}>
                        <Grid p={3}>
                            <Stack spacing={2} sx={{ mb: 1, mt: 1, position: 'relative' }}>
                                <Typography variant="h3" textAlign="center">
                                    Cadastro de Usuário
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                    sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}
                                >
                                    <Typography variant="body2">Já possui uma conta?</Typography>
                                    <NextLink href={'/login'} passHref>
                                        <Link variant="subtitle2">Faça o login</Link>
                                    </NextLink>
                                </Stack>
                            </Stack>

                            <AuthRegisterForm />

                            <Typography
                                component="div"
                                sx={{
                                    color: 'text.secondary',
                                    mt: 2,
                                    mb: 2,
                                    typography: 'caption',
                                    textAlign: 'center',
                                }}
                            >
                                {'Ao fazer o cadastro o(a) usuário(a) aceita os  '}
                                <Link underline="always" color="text.primary">
                                    Termos de Serviço
                                </Link>
                                {' e a '}
                                <Link underline="always" color="text.primary">
                                    Política de Privacidade
                                </Link>
                                .
                            </Typography>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

// ----------------------------------------------------------------------

function AuthRegisterForm() {
    const { push } = useRouter()

    const [message, setMesssage] = useState<Imessage | null>(null)

    const onSubmit = async (data: IRegisterForm) => {
        const pattern = /^\S+@\S+\.\S+$/
        if (!data.email.match(pattern)) {
            setMesssage({ text: 'Email inválido', severity: 'error' })
            return
        }

        if (data.password.length < 6) {
            setMesssage({ text: 'A senha deve ter no mínimo 6 caracteres', severity: 'error' })
            return
        }

        const authController = new AuthController()
        try {
            await authController.register(data)
            setMesssage({ text: 'Cadastro feito com sucesso!', severity: 'success' })
        } catch (error) {
            setMesssage({ text: 'Falha ao realizar cadastro', severity: 'error' })
        }
    }

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'fullname',
            label: 'Digite o seu nome completo',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXT,
        },
        {
            name: 'username',
            label: 'Digite o seu nome de usuário',
            ui: { grid: 6 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXT,
        },
        {
            name: 'cpf',
            label: 'Digite o seu cpf',
            ui: { grid: 6 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXT,
            mask: '999.999.999-99',
        },
        {
            name: 'email',
            label: 'Digite o seu email',
            ui: { grid: 6 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXT,
        },
        {
            name: 'password',
            label: 'Digite a sua senha',
            ui: { grid: 6 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.PASSWORD,
        },
    ]

    return (
        <>
            <Stack spacing={3}>{message && <Alert severity={message.severity}>{message.text}</Alert>}</Stack>
            <ApolloForm
                schema={formSchema}
                onSubmit={onSubmit}
                submitButtonText="Cadastrar"
                defaultExpandedGroup={false}
            />
        </>
    )
}
