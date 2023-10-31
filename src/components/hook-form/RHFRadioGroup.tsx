import { Controller, useFormContext } from 'react-hook-form'

import {
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup,
    RadioGroupProps,
} from '@mui/material'

interface IProps {
    name: string
    options?: { label: string; value: string }[]
    getOptionLabel?: string[]
    disabled?: boolean
}

export default function RHFRadioGroup({
    name,
    options,
    getOptionLabel,
    disabled,
    ...other
}: IProps & RadioGroupProps) {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <RadioGroup {...field} row {...other}>
                        {options?.map((option, index) => (
                            <FormControlLabel
                                key={option.label}
                                value={option.value}
                                control={<Radio />}
                                label={
                                    getOptionLabel?.length
                                        ? getOptionLabel[index]
                                        : option.label
                                }
                                disabled={disabled}
                            />
                        ))}
                    </RadioGroup>
                    {!!error && (
                        <FormHelperText error sx={{ px: 2 }}>
                            {error.message}
                        </FormHelperText>
                    )}
                </div>
            )}
        />
    )
}
