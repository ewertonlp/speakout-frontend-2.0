import { Grid, TextField } from '@mui/material'
import { WidgetProps } from '@rjsf/utils'

function CustomTextarea(props: WidgetProps) {
    return (
        <Grid item xs={12}>
            <TextField
                sx={{ width: '100%' }}
                aria-label="empty textarea"
                value={props.value || ''}
                required={props.required}
                multiline
                minRows={1}
                maxRows={15}
                label={props.label}
                placeholder={props.label}
                onChange={(event: any) => props.onChange(event.target.value)}
            />
        </Grid>
    )
}

export default CustomTextarea
