// next
import NextLink from 'next/link'
// @mui
import { Box, Link, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
// auth
// routes
// components
import { useAuthContext } from 'src/auth/useAuthContext'
import { CustomAvatar } from '../../../components/custom-avatar'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
    transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
    }),
}))

// ----------------------------------------------------------------------

export default function NavAccount() {
    const { user } = useAuthContext()

    return (
        <NextLink href={'/usuarios'} passHref>
            <Link underline="none" color="inherit">
                <StyledRoot>
                    <CustomAvatar alt={user?.username} name={user?.username} />

                    <Box sx={{ ml: 2, minWidth: 0 }}>
                        <Typography variant="subtitle2" noWrap>
                            {user?.username}
                        </Typography>
                    </Box>
                </StyledRoot>
            </Link>
        </NextLink>
    )
}
