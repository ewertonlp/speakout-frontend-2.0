import { Alert, Box, Container, Grid, Link, Paper, Stack, Typography } from '@mui/material'
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
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Head>
                <title>Login</title>
            </Head>

            <Grid container justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={10} lg={8}>
                    <AuthLoginForm />
                </Grid>
            </Grid>
        </Container>
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
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'row' },
                borderRadius: 2,
                paddingTop: { xs: '20px', sm: '0px' },
            }}
        >
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: { xs: '60%', sm: '50%' },
                    margin: { xs: '0 auto', sm: '0px' },
                }}
            >
                <img
                    src="/assets/images/login/woman-job.jpg"
                    alt="Image"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover', borderRadius: '2px 0 0 2px' }}
                />
            </Box>

            <Grid p={3} sx={{ width: { xs: '100%', sm: '50%' } }}>
                <Grid item sx={{ textAlign: 'center', padding: '20px 0' }}>
                    <Typography sx={{ color: '#2D7999' }} variant="h4">
                        Bem vindo a Speak-out
                    </Typography>
                </Grid>

                <Stack spacing={3}>{message && <Alert severity={message.severity}>{message.text}</Alert>}</Stack>

                <ApolloForm
                    schema={formSchema}
                    onSubmit={onSubmit}
                    submitButtonText="Entrar"
                    defaultExpandedGroup={false}
                    noRenderCardInForm
                />

                <Stack alignItems="flex-end" sx={{ mt: 2 }}>
                    <NextLink href={'/forgot-password'} passHref>
                        <Link variant="body2" color="inherit" underline="always">
                            Esqueceu sua senha?
                        </Link>
                    </NextLink>
                </Stack>
            </Grid>
        </Paper>
    )
}
