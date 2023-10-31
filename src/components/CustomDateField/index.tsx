import { Grid, TextField } from '@mui/material'
import { WidgetProps } from '@rjsf/utils'

function CustomDateField(props: WidgetProps) {
    return (
        <Grid item xs={12}>
            <TextField
                sx={{ width: '100%' }}
                aria-label="empty"
                value={props.value || ''}
                required={props.required}
                label={props.label}
                type="date"
                onChange={(event: any) => props.onChange(event.target.value)}
            />
        </Grid>
    )
}

export default CustomDateField
