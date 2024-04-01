import { Alert, Card, Container, Grid, Stack, Typography } from '@mui/material'
import AuthController from 'controllers/authController'
import { useState } from 'react'
import { ApolloForm, ApolloFormSchemaItem } from 'src/components'
import { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'
import { ILoginForgotPassword } from 'types/IAuth'
import { Imessage } from 'types/Imessage'

// ----------------------------------------------------------------------

export default function ForgotPassword() {
    return (
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Grid container justifyContent={'center'} alignItems={'center'}>
                <Grid item>
                    <Form />
                </Grid>
            </Grid>
        </Container>
    )
}

function Form() {
    const [message, setMesssage] = useState<Imessage | null>(null)

    const onSubmit = async (data: ILoginForgotPassword) => {
        const authController = new AuthController()

        const pattern = /^\S+@\S+\.\S+$/
        if (!data.email.match(pattern)) {
            setMesssage({ text: 'Tipo de Email inválido, tente novamente!', severity: 'error' })
            return
        }

        try {
            await authController.sendPasswordRecoveryEmail(data)
            setMesssage({ text: 'O email foi enviado. Verifique sua caixa de entrada', severity: 'success' })
        } catch (error) {
            setMesssage({ text: 'Erro ao enviar email!', severity: 'error' })
        }
    }

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'email',
            label: 'Digite o seu email',
            // groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXT,
        },
    ]

    return (
        <Card sx={{ maxWidth: '550px', height: '100%', border: '1px solid #777777', backgroundColor: "card.default" }}>
            <Grid p={3}>
                <Grid item sx={{ textAlign: 'center', padding: '20px 0' }}>
                    <Typography variant="h4">Redefinir sua Senha</Typography>
                    <Typography sx={{ marginTop: '1rem' }} variant="body1">
                        Para redefinir sua senha, informe o email cadastrado em sua conta e lhe enviaremos um link com
                        as instruções.
                    </Typography>
                </Grid>
                <Stack spacing={3}>{message && <Alert severity={message.severity}>{message.text}</Alert>}</Stack>
                <ApolloForm
                    schema={formSchema}
                    onSubmit={onSubmit}
                    submitButtonText="Enviar"
                    defaultExpandedGroup={false}
                />
            </Grid>
        </Card>
    )
}
