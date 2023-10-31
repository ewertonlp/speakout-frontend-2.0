import { Card } from '@mui/material'
import React, { ReactNode } from 'react'

function CustomCard({ children }: { children: ReactNode }) {
    return <Card sx={{ paddingTop: '15px' }}>{children}</Card>
}

export default CustomCard
