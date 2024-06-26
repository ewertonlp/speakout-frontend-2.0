import { LoadingButton } from '@mui/lab'
import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ComplaintController from 'controllers/complaintController'
import TenantController from 'controllers/tenantController'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Loading from 'src/components/Loading'
import AppBar from 'src/components/ouvidoria/AppBar'
import { HistoryofOccurencesModal } from 'src/components/ouvidoria/HistoryOfOccurencesModal'
import NoCompany from 'src/components/ouvidoria/NoCompany'
import { ICompanyInfo } from 'types/ICompanyInfo'
import { IPostHistory } from 'types/IPostHistory'

function StatusDenunciaPage() {
    const [protocol, setProtocol] = useState('')
    const router = useRouter()
    const company = router.query.company
    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>()
    const [noCompany, setNoCompany] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingComplaints, setLoadingComplaints] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [historyOfOccurences, setHistoryOfOccurences] = useState<IPostHistory[]>()
    const { enqueueSnackbar } = useSnackbar()
    const theme = useTheme()

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    useEffect(() => {
        if (!router.isReady) return

        const getInfo = async () => {
            setLoading(true)
            const tenantController = new TenantController()
            try {
                if (typeof company === 'string') {
                    const data = await tenantController.getBasicInformation(company)
                    setCompanyInfo(data)
                } else {
                    throw Error('invalid company')
                }
                setNoCompany(false)
            } catch (error) {
                setNoCompany(true)
            }
            setLoading(false)
        }
        getInfo()
    }, [router.isReady])

    async function handleSubmitButton() {
        setLoadingComplaints(true)
        const complaintController = new ComplaintController()
        try {
            const response = await complaintController.getHistoryOfComplaint(protocol)
            setHistoryOfOccurences(response.posthistories)
            setOpenModal(true)
        } catch (error) {
            enqueueSnackbar('Protocolo não encontrado!', {
                variant: 'error',
            })
        }
        setLoadingComplaints(false)
    }

    if (loading) return <Loading />

    if (noCompany || !companyInfo?.status) return <NoCompany />

    return (
        <>
            <Head>
                <title>Status da denúncia</title>
            </Head>

            <AppBar logoUrl={companyInfo?.logo.url as string} />
            <Grid container display="flex" alignItems="center" height="calc(100% - 84px)" justifyContent="center">
                <Grid item xs={10} lg={5}>
                    <Card
                        sx={{
                            border: `1px solid ${borderColor}`,
                            backgroundColor: 'card.default',
                            borderRadius: '10px',
                            padding: '2rem',
                            '&:hover': {
                                boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
                            },
                        }}
                    >
                        <Grid
                            p={3}
                            sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', rowGap: '35px' }}
                        >
                            <Typography variant="h3">Acompanhar relato</Typography>
                            <Typography variant="body1">
                                Insira o número de protocolo, recebido por email, no campo abaixo para verificar o
                                status do relato ou enviar novas evidências para o comitê. Através do número de
                                protocolo é possível acompanhar todo o processo de tratamento do seu relato.
                            </Typography>
                            <TextField
                                label="Qual o número de protocolo do seu relato?"
                                onChange={e => setProtocol(e.target.value)}
                                required
                                placeholder=""
                                type="text"
                                id="outlined-basic"
                                fullWidth
                                autoComplete={'false'}
                                sx={{
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: '15px',
                                    backgroundColor: '#d6d6d6',
                                }}
                            />
                            <Grid display="flex" flexDirection="row" gap="10px" justifyContent="center">
                                <Button
                                    variant="outlined"
                                    onClick={() => router.back()}
                                    sx={{ width: '150px', borderRadius: '30px' }}
                                >
                                    Voltar
                                </Button>
                                <LoadingButton
                                    loading={loadingComplaints}
                                    variant="contained"
                                    onClick={handleSubmitButton}
                                    sx={{ width: '150px', borderRadius: '30px' }}
                                >
                                    Consultar
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            {historyOfOccurences && (
                <HistoryofOccurencesModal history={historyOfOccurences} open={openModal} setOpen={setOpenModal} />
            )}
        </>
    )
}

export default StatusDenunciaPage
