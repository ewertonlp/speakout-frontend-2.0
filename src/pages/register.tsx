import { Alert, Card, Container, Grid, Link, Stack, Typography } from '@mui/material'
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
        <Container
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
            }}
        >
            <Head>
                <title>Cadastro</title>
            </Head>

            <Card sx={{ maxWidth: '850px', boxShadow: '1px 1px 10px #cecece', my: 5 }}>
                <Grid p={3}>
                    <Stack spacing={2} sx={{ mb: 1, mt: 1, position: 'relative' }}>
                        <Typography variant="h4">Cadastro</Typography>
                        <Stack direction="row" spacing={0.5}>
                            <Typography variant="body2">Já possui uma conta?</Typography>
                            <NextLink href={'/login'} passHref>
                                <Link variant="subtitle2">Faça login</Link>
                            </NextLink>
                        </Stack>
                    </Stack>

                    <AuthRegisterForm />

                    <Typography
                        component="div"
                        sx={{ color: 'text.secondary', mt: 2, mb: 2, typography: 'caption', textAlign: 'center' }}
                    >
                        {'By signing up, I agree to '}
                        <Link underline="always" color="text.primary">
                            Terms of Service
                        </Link>
                        {' and '}
                        <Link underline="always" color="text.primary">
                            Privacy Policy
                        </Link>
                        .
                    </Typography>
                </Grid>
            </Card>
        </Container>
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
            ui: { grid: 6 },
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
            ui: { grid: 12 },
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
                submitButtonText="Enviar"
                defaultExpandedGroup={false}
            />
        </>
    )
}
