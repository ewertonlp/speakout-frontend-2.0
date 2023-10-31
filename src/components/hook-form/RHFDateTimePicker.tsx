import { Controller, useFormContext } from 'react-hook-form'

import { TextField, TextFieldProps, Tooltip } from '@mui/material'
// import { DateTimePicker } from '@mui/lab';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import { useState } from 'react'

interface IProps {
    name: string
    description?: string
}

export default function RHFDateTimePicker({
    name,
    ...other
}: IProps & TextFieldProps) {
    const { control } = useFormContext()
    const { label, description } = other
    const [toolTipOpen, setTooltipOpen] = useState<boolean>(false)

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                    label={label}
                    value={field.value}
                    inputFormat="DD/MM/YYYY hh:mm a"
                    onChange={newValue => {
                        field.onChange(dayjs(newValue))
                    }}
                    renderInput={(params: any) => (
                        <Tooltip
                            title={description ? description : ''}
                            arrow
                            open={toolTipOpen}
                        >
                            <TextField
                                {...params}
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                                {...other}
                                onMouseLeave={() => setTooltipOpen(false)}
                                onMouseEnter={() => setTooltipOpen(true)}
                            />
                        </Tooltip>
                    )}
                />
            )}
        />
    )
}
