import { Button, Grid, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React from 'react'

function TermosAceite({
    setTermAccepted,
    companyName,
}: {
    setTermAccepted?: React.Dispatch<React.SetStateAction<boolean>>
    companyName: string
}) {
    const { push, query, isReady } = useRouter()

    function handleYesButtonClick() {
        Cookies.set('termoAceito', 'sim')
        if (setTermAccepted) {
            setTermAccepted(true)
        } else {
            push('/ouvidoria/formulario?company=' + query.company)
        }
    }

    function handleNoButtonClick() {
        push('/ouvidoria/' + query.company)
    }

    return (
        <Grid container>
            <Grid
                item
                lg={8}
                xs={12}
                sx={{
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '20px',
                        padding: '30px',
                        boxShadow: '4px 4px 40px -12px rgba(0,0,0,0.20)',
                        marginTop: '30px',
                    }}
                >
                    <Typography variant="h4" textAlign="center">
                        Termo de aceite
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="normal" textAlign="center">
                        A veracidade das informações providas é de responsabilidade do relator. Este canal é exclusivo
                        para receber denúncias e não deve ser usado para dúvida, reclamação, solicitação de informação,
                        sugestão ou elogio. Todas as denúncias serão encaminhadas para o Comitê de Ética da empresa{' '}
                        {companyName}.
                    </Typography>
                    <Grid>
                        <Typography variant="h6" fontWeight="normal">
                            Você concorda com os termos de aceite? *
                        </Typography>
                        <Typography variant="body2" fontWeight="normal">
                            Ao prosseguir, você declara estar de acordo com o{' '}
                            <a href="/assets/documents/politica-de-privacidade.pdf" rel="noreferrer" target="_blank">
                                Termo de Uso e Políticas de Privacidade.
                            </a>
                            <br />
                            Marque "Sim" para continuar
                        </Typography>
                        <Grid sx={{ display: 'flex', columnGap: '10px', marginTop: '15px' }}>
                            <Button onClick={handleNoButtonClick} variant="outlined" color="success">
                                Não
                            </Button>
                            <Button onClick={handleYesButtonClick} variant="contained" color="success">
                                Sim
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    lg={8}
                    xs={12}
                    sx={{ margin: '30px 0', display: 'flex', flexDirection: 'column', rowGap: '30px' }}
                    item
                >
                    <Grid sx={{ display: 'flex' }}>
                        <Typography variant="body1" fontWeight="normal" textAlign="center">
                            Status disponível após 72 horas exclusivo para denúncias registradas. Casos de dúvida,
                            reclamação, solicitação de informação, pedido, opinião, sugestão, consulta ou elogio estarão
                            com status arquivado.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TermosAceite
