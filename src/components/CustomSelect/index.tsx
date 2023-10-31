import { Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { WidgetProps } from '@rjsf/utils'
import React from 'react'

type IItem = {
    label: string
    value: any
}

function CustomSelect(props: WidgetProps) {
    const [value, setValue] = React.useState<string>()

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string)
        props.onChange([event.target.value])
    }

    const items = props.options.enumOptions as IItem[]

    return (
        <Grid item xs={12}>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: '100%' }}
                value={value || ''}
                onChange={handleChange}
                label={props.label}
            >
                {items.map((item, index) => (
                    <MenuItem key={index} value={item.label}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </Grid>
    )
}

export default CustomSelect
