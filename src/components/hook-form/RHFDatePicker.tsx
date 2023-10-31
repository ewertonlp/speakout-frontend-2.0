import { TextField, TextFieldProps, Tooltip } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import * as React from 'react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

dayjs.locale('pt-br')

interface IProps {
    maxDate?: any
    name: string
    onChange?: (e: any) => void
    description?: string
    useReactHookFormValue?: boolean
}

export default function RHFDatePicker({
    name,
    useReactHookFormValue,
    onChange,
    ...other
}: IProps & TextFieldProps) {
    const { control } = useFormContext()
    const { label, description, maxDate } = other
    const [toolTipOpen, setTooltipOpen] = useState<boolean>(false)
    const [initialValueSeted, setInitialValue] = useState<boolean>(false)

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs(other.value?.toString()),
    )

    const handleChange = (newValue: Dayjs | null, localOnChange) => {
        if (!newValue) {
            newValue = null
            setValue(newValue)
            return localOnChange(newValue)
        }
        setValue(newValue)
        localOnChange(newValue)

        if (onChange) {
            onChange(newValue)
        }
    }

    React.useEffect(() => {
        if (
            typeof other.value == 'string' &&
            other.value &&
            dayjs(other.value).format() &&
            !initialValueSeted
        ) {
            setValue(dayjs(other.value?.toString()))
            return setInitialValue(true)
        }

        setTimeout(() => {
            setInitialValue(true)
        }, 3000)
    }, [other.value, initialValueSeted, other])

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { ref, onBlur, name, onChange, ...field },
                fieldState: { error },
            }) => (
                <DesktopDatePicker
                    maxDate={maxDate != null ? dayjs(maxDate) : null}
                    {...field}
                    value={useReactHookFormValue ? field.value : value}
                    onChange={newValue => {
                        handleChange(newValue, onChange)
                    }}

                    inputRef={ref}
                    inputFormat="DD/MM/YYYY"
                    label={label}
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
                                inputProps={{
                                    ...params.inputProps,
                                    placeholder: 'dd/mm/aaaa',
                                }}
                                onBlur={onBlur}
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
