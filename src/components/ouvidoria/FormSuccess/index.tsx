import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Grid, Typography } from '@mui/material'

function FormSuccess({ protocol }: { protocol: string }) {
    return (
        <Grid padding="20px" paddingBottom="0">
            <Grid display="flex" justifyContent="center" marginTop="10px">
                <CheckCircleOutlineIcon sx={{ fontSize: '60px', color: 'green' }} />
            </Grid>
            <Typography variant="h4" fontWeight="normal" color="green" mb="10px" textAlign="center">
                Formulário enviado com sucesso!
            </Typography>
            <Typography variant="h6" fontWeight="normal" color="#474747" textAlign="center">
                O número do protocolo é:
            </Typography>
            <Typography variant="h6" fontWeight="bold" textAlign="center">
                {protocol}
            </Typography>
            <Typography variant="h6" color="#474747" textAlign="center" mt="10px">
                Enviamos um e-mail de confirmação. Verifique sua caixa de spam.
            </Typography>
        </Grid>
    )
}

export default FormSuccess
