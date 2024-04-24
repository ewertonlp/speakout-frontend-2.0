import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Grid, Typography } from '@mui/material'

function FormSuccess({ protocol }: { protocol: string }) {
    return (
        <Grid padding="20px" paddingBottom="0">
            <Grid display="flex" justifyContent="center" marginTop="10px">
                <CheckCircleOutlineIcon sx={{ fontSize: '60px', color: 'primary.dark', mb:2 }} />
            </Grid>
            <Typography variant="h4" fontWeight="normal" color="primary.dark" mb="20px" textAlign="center">
                Formulário enviado com sucesso!
            </Typography>
            <Typography variant="h5" fontWeight="normal" color="#474747" textAlign="center">
                O número do protocolo é:
            </Typography>
            <Typography variant="h5" fontWeight="bold" textAlign="center" mb='20px'>
                {protocol}
            </Typography>
            <Typography variant="h6" color="#474747" textAlign="center" mt="10px">
                Enviamos um e-mail de confirmação. Verifique sua caixa de spam.
            </Typography>
        </Grid>
    )
}

export default FormSuccess
