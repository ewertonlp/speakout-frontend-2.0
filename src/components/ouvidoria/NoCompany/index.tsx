import { Box, Grid, Typography } from '@mui/material'

function NoCompany() {
    return (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid>
                <Grid>
                    <Typography variant="h4">Instituição não identificada</Typography>
                </Grid>
                <Grid>
                    <Typography variant="h4">Tente novamente mais tarde!</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NoCompany
