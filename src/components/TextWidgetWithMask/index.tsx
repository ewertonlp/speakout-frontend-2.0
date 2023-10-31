import { Grid, TextField } from '@mui/material'
import { WidgetProps } from '@rjsf/utils'
import InputMask from 'react-input-mask'

function TextWidgetWithMask(props: WidgetProps) {
    return (
        <Grid item xs={12}>
            <InputMask
                mask={props.options.mask as string}
                type="text"
                className="custom"
                value={props.value || ''}
                maskPlaceholder={null}
                required={props.required}
                onChange={(event: any) => props.onChange(event.target.value)}
            >
                <TextField id="outlined-basic" label={props.label} placeholder={props.placeholder} fullWidth />
            </InputMask>
        </Grid>
    )
}

export default TextWidgetWithMask
