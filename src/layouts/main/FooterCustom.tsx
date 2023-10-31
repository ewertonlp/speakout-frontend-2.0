import { Container, Typography } from '@mui/material'

export const FooterCustom = () => (
    <Container
        component="footer"
        maxWidth={false}
        sx={{ textAlign: 'center', padding: '40px', borderTop: '1px solid #e0e0e0', mt: 'auto' }}
    >
        <Typography>©2023 - Todos os direitos reservados</Typography>
    </Container>
)
