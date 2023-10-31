import { CircularProgress, Container } from '@mui/material'
import React from 'react'

function Loading() {
    return(
        <Container sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 150px)'
        }}>
            <CircularProgress color="success" />
        </Container>
    );
}

export default Loading