
import { TextField, TextFieldProps, Tooltip } from '@mui/material'
import { useState } from 'react'
import { Controller, Noop, useFormContext } from 'react-hook-form'
import InputMask from 'react-input-mask'

interface IProps {
    name: string
    mask?: string
    onChange?: (...event: any[]) => void
    onBlur?: Noop
    description?: string
}

export default function RHFTextField({
    name,
    ...other
}: IProps & TextFieldProps) {
    const { control } = useFormContext()
    const { mask, label, onChange, onBlur, description } = other
    const [toolTipOpen, setTooltipOpen] = useState<boolean>(false)

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                if (mask) {
                    return (
                        <InputMask
                            mask={mask}
                            alwaysShowMask={false}
                            value={field.value}
                            onChange={e => {
                                field.onChange(e)
                                if (onChange) {
                                    onChange(e)
                                }
                            }}
                            onBlur={e => {
                                field.onBlur()
                                if (onBlur) {
                                    onBlur(e)
                                }
                            }}
                            disabled={other.disabled}
                            required={other.required}
                        >
                            <TextField
                                label={label}
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                            />
                        </InputMask>
                    )
                }
                return (
                    <Tooltip
                        title={description ? description : ''}
                        arrow
                        open={toolTipOpen}
                    >
                        <TextField
                            onMouseLeave={() => setTooltipOpen(false)}
                            onMouseEnter={() => setTooltipOpen(true)}
                            {...field}
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            {...other}
                        />
                    </Tooltip>
                )
            }}
        />
    )
}
