import { Box, BoxProps, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import NextLink from 'next/link'
import { forwardRef } from 'react'

export interface LogoProps extends BoxProps {
    disabledLink?: boolean
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme()

    const PRIMARY_LIGHT = theme.palette.primary.light
    const PRIMARY_MAIN = theme.palette.primary.main
    const PRIMARY_DARK = theme.palette.primary.dark

    const logo = (
        <Box
            component="img"
            ref={ref}
            src="/logo/logo_speakout_branco.png"
            alt="SpeakOut Logo"
            sx={{
                width: '70px',
                height: '70px',
                marginTop: '0.5rem',
                cursor: 'pointer',
                ...sx,
            }}
            {...other}
        />
    )

    if (disabledLink) {
        return <>{logo}</>
    }

    return (
        <NextLink href="/" passHref>
            <Link sx={{ display: 'contents' }}>{logo}</Link>
        </NextLink>
    )
})

export default Logo
