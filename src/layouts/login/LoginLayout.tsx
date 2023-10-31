// @mui
import { Stack } from '@mui/material'
// components
//
import { StyledContent, StyledRoot } from './styles'

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode
}

export default function LoginLayout({ children }: Props) {
    return (
        <StyledRoot>
            <StyledContent>
                <Stack sx={{ width: '100%' }}> {children} </Stack>
            </StyledContent>
        </StyledRoot>
    )
}
