import { Button, Card, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Iconify from 'src/components/Iconify'

function UserConfirmation() {
    const { push } = useRouter()

    return (
        <Container sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card
                sx={{
                    width: '80%',
                    minWidth: '300px',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography textAlign="center" variant="h5">
                    Usuário confirmado com sucesso!
                </Typography>
                <Button
                    variant="contained"
                    sx={{ padding: '8px', width: '30%', fontSize: '16px' }}
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
