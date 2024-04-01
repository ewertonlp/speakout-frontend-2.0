import { m } from 'framer-motion'
// next
import Head from 'next/head'
import NextLink from 'next/link'
// @mui
import { Button, Typography } from '@mui/material'
// layouts
import CompactLayout from '../layouts/compact'
// components
import { MotionContainer, varBounce } from '../components/animate'
// assets
import { PageNotFoundIllustration } from '../assets/illustrations'

// ----------------------------------------------------------------------

Page404.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>

// ----------------------------------------------------------------------

export default function Page404() {
    return (
        <>
            <Head>
                <title> 404 Page Not Found</title>
            </Head>

            <MotionContainer>
                <m.div variants={varBounce().in}>
                    <Typography variant="h3" paragraph>
                        Ops, Página não encontrada!
                    </Typography>
                </m.div>

                <m.div variants={varBounce().in}>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Desculpe, não conseguimos encontrar a página que você está procurando. Talvez você tenha
                        digitado incorretamente a URL? Certifique-se de verificar a ortografia.
                    </Typography>
                </m.div>

                <m.div variants={varBounce().in}>
                    <PageNotFoundIllustration
                        sx={{
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />
                </m.div>

                <NextLink href="/" passHref>
                    <Button size="large" variant="contained">
                        Ir para a Homepage
                    </Button>
                </NextLink>
            </MotionContainer>
        </>
    )
}
