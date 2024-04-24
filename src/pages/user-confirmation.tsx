import { Button, Card, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Iconify from 'src/components/Iconify'

function UserConfirmation() {
    const { push } = useRouter()

    return (
        <Container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card
                sx={{
                    width: '50%',
                    minWidth: '300px',
                    height: '40vh',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid #adadad',
                    backgroundColor: 'card.default',
                }}
            >
                <Typography textAlign="center" mb={2} variant="h5">
                    Usuário confirmado com sucesso!
                </Typography>
                <Button
                    variant="contained"
                    sx={{ padding: '8px', width: '50%', fontSize: '16px', borderRadius:'30px' }}
                    onClick={() => push('/login')}
                >
                    Ir para login
                    <Iconify icon="akar-icons:link-out" width="16px" height="16px" marginLeft="8px" />
                </Button>
            </Card>
        </Container>
    )
}

export default UserConfirmation
