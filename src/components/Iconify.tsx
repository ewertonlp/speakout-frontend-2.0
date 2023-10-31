// icons
import { Icon, IconifyIcon } from '@iconify/react'

import { Box, BoxProps, SxProps } from '@mui/material'

export interface IconifyProps extends BoxProps {
    sx?: SxProps
    icon: IconifyIcon | string
}

const I = Icon as any

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
    return <Box component={I} icon={icon} sx={{ ...sx }} {...other} />
}
