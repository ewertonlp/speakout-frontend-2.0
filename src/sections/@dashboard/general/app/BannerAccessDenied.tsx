import { Box, Button, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { m } from 'framer-motion'
import NextLink from 'next/link'
import { MotionContainer, varBounce } from '../../../../components/animate'
import Iconify from '../../../../components/iconify/Iconify'
import Image from '../../../../components/image/Image'

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
}))

interface BannerAccessDeniedProps {
    title: string
    description: string
}

export default function BannerAccessDenied({ title, description }: BannerAccessDeniedProps) {
    return (
        <RootStyle>
            <Container component={MotionContainer}>
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                    <m.div variants={varBounce().in}>
                        <Typography variant="h3" paragraph>
                            {title}
                        </Typography>
                    </m.div>
                    {description && <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>}

                    <m.div variants={varBounce().in}>
                        <Image
                            sx={{ height: 360, my: { xs: 5, sm: 10 } }}
                            disabledEffect
                            src={'/images/erro403.svg'}
                            alt="error image"
                        />
                    </m.div>
                    <NextLink href="/app/home" passHref>
                        <Button size="large" variant="contained">
                            <Iconify icon={'ant-design:home-outlined'} />
                            &nbsp;Início
                        </Button>
                    </NextLink>
                </Box>
            </Container>
        </RootStyle>
    )
}
