import { Box, Grid, Typography } from '@mui/material'
import TenantController from 'controllers/tenantController'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from 'src/components/Loading'
import AppBar from 'src/components/ouvidoria/AppBar'
import { ButtonsGroup } from 'src/components/ouvidoria/ButtonsGroup'
import NoCompany from 'src/components/ouvidoria/NoCompany'
import { FooterCustom } from 'src/layouts/main/FooterCustom'
import { ICompanyInfo } from 'types/ICompanyInfo'

function Home() {
    const router = useRouter()
    const company = router.query.company
    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>()
    const [noCompany, setNoCompany] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!router.isReady) return

        const getInfo = async () => {
            setLoading(true)
            const tenantController = new TenantController()
            try {
                if (typeof company === 'string') {
                    const data = await tenantController.getBasicInformation(company)
                    setCompanyInfo(data)
                    console.log(data)
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

    if (loading) return <Loading />

    if (noCompany || !companyInfo?.status) return <NoCompany />

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Head>
                <title>Início</title>
            </Head>

            <AppBar logoUrl={companyInfo?.logo.url ? (companyInfo?.logo.url as string) : ''} />
            <Box sx={{ padding: '30px 10px' }}>
                <Grid container alignItems="center" justifyContent="center" rowGap={'10px'}>
                    <Grid item xs={12} lg={6}>
                        <img src={companyInfo?.banner.url} alt="" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" color={'black'} textAlign={'center'}>
                                    {companyInfo?.title_banner}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" color={'black'} fontWeight="300" textAlign={'center'}>
                                    {companyInfo?.subtitle_banner}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Grid item xs={12}>
                        <Typography variant="h3" color="#555555" textAlign="center" sx={{ margin: '25px 0' }}>
                            Como funciona
                        </Typography>
                        <Typography
                            variant="h6"
                            marginBottom={10}
                            fontWeight="normal"
                            textAlign={'justify'}
                            paddingX={'6%'}
                        >
                            O canal de relatos é mais que um canal para atendimento da legislação. Levamos a sério o
                            compromisso da dignidade da pessoa humana, e por isso, o canal torna-se a maior ferramenta
                            de diálogo entre empregador e colaboradores. Incidentes relacionados a condutas
                            inapropriadas devem ser reportados neste site ou pelo telefone, disponível 24 horas por dia,
                            sete dias por semana. Algumas situações que podem ser registradas são: assédio
                            moral/comportamento inadequado; assédio sexual; corrupção; conflito de interesses; fraude;
                            roubos e furtos; uso indevido de informações privilegiadas ou confidenciais.
                            <br /> As informações registradas neste canal serão recebidas e tratadas por uma empresa
                            independente e especializada que tem por obrigação assegurar o{' '}
                            <strong>sigilo absoluto</strong> e o tratamento adequado das informações, sem conflito de
                            interesses. Caso prefira denunciar via WhatsApp também é possível. É comum os casos em que
                            mulheres são vítimas de assédio sexual e assédio moral no trabalho, tendo que esconderem a
                            situação de sua família e colegas, com medo de represália e perda do emprego. Aqui,
                            garantimos seu direito de ser ouvido, bem como, tratamos de forma profissional os casos
                            denunciados em nosso portal
                        </Typography>
                        <ButtonsGroup text="Denuncie aqui" />
                    </Grid>
                </Grid>
            </Box>
            <FooterCustom />
        </Box>
    )
}

export default Home
