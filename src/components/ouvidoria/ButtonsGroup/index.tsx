import { Button, Grid } from '@mui/material'
import { useRouter } from 'next/router'

export interface ButtonsGroupProps {
    text: string
}

export function ButtonsGroup({ text }: ButtonsGroupProps) {
    const { push, query } = useRouter()
    const CustomButtom = ({ onClick, children }) => (
        <Button variant="contained" onClick={onClick} sx={{ padding: '10px 40px', fontSize: '18px', borderRadius: '25px' }}>
            {children}
        </Button>
    )

    return (
        <Grid
            item
            sx={{ display: 'flex', gap: '10px', margin: '50px 0 70px 0', flexWrap: 'wrap', justifyContent: 'left' }}
        >
            <CustomButtom onClick={() => push(`/ouvidoria/formulario?company=${query.company}`)}>{text}</CustomButtom>
        </Grid>
    )
}
