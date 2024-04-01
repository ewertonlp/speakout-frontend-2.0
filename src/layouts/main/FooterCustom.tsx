import { Container, Typography } from '@mui/material'

function obterAnoAtual(): number {
    return new Date().getFullYear()
}

export const FooterCustom = () => (
    <Container
        component="footer"
        maxWidth={false}
        sx={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #e0e0e0', mt: 'auto' }}
    >
        {(() => {
            const anoAtual: number = obterAnoAtual()
            return <Typography>©{anoAtual} - Todos os direitos reservados</Typography>
        })()}
    </Container>
)
