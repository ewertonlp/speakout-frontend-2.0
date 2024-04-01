import { Alert, Card, Container, Grid, Stack, Typography } from '@mui/material'
import AuthController from 'controllers/authController'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ApolloFormSchemaItem } from 'src/components'
import ApolloForm, { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'
import { INewPassword } from 'types/IAuth'
import { Imessage } from 'types/Imessage'

// ----------------------------------------------------------------------

export default function PasswordChange() {
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

    const router = useRouter()
    const { code } = router.query

    const onSubmit = async (data: INewPassword) => {
        if (typeof code === 'string') {
            data = { ...data, code: code }
        }

        if (data.password !== data.passwordConfirmation) {
            setMesssage({ text: 'As senhas não coincidem', severity: 'error' })
            return
        }
        const authController = new AuthController()
        try {
            await authController.changePassword(data)
            setMesssage({ text: 'Senha alterada com sucesso!', severity: 'success' })
            router.push('/login')
        } catch (error) {
            setMesssage({ text: 'Erro ao alterar senha', severity: 'error' })
        }
    }

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'password',
            label: 'Digite sua nova senha',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.PASSWORD,
        },
        {
            name: 'passwordConfirmation',
            label: 'Digite novamente sua nova senha',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.PASSWORD,
        },
    ]

    return (
        <Card
            sx={{
                maxWidth: '550px',
                height: '100%',
                border: '1px solid #777777',
                backgroundColor: 'card.default',
            }}
        >
            <Grid item sx={{ textAlign: 'center' }} p={4}>
                <Typography variant="h4" mb={2}>
                    Trocar de senha
                </Typography>
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
