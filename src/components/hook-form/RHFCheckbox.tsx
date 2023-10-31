import { Controller, useFormContext } from 'react-hook-form'

import {
    Checkbox,
    FormControlLabel,
    FormControlLabelProps,
    FormGroup,
    Tooltip,
} from '@mui/material'
import { MouseEventHandler, useState } from 'react'

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
    name: string
    indeterminate?: boolean
    onClickCheckbox?: MouseEventHandler<HTMLButtonElement>
    description?: string
}

export function RHFCheckbox({
    name,
    indeterminate,
    onClickCheckbox,
    disabled,
    ...other
}: RHFCheckboxProps) {
    const { control } = useFormContext()
    const { description } = other
    const [toolTipOpen, setTooltipOpen] = useState<boolean>(false)

    return (
        <FormControlLabel
            control={
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Tooltip
                            title={description ? description : ''}
                            arrow
                            open={toolTipOpen}
                        >
                            <Checkbox
                                onMouseLeave={() => setTooltipOpen(false)}
                                onMouseEnter={() => setTooltipOpen(true)}
                                {...field}
                                disabled={disabled}
                                onClick={onClickCheckbox}
                                checked={field.value ?? false}
                                indeterminate={indeterminate}
                            />
                        </Tooltip>
                    )}
                />
            }
            disabled={disabled}
            {...other}
        />
    )
}

interface RHFMultiCheckboxProps
    extends Omit<FormControlLabelProps, 'control' | 'label'> {
    name: string
    options: string[]
}

export function RHFMultiCheckbox({
    name,
    options,
    ...other
}: RHFMultiCheckboxProps) {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const onSelected = (option: string) =>
                    field.value.includes(option)
                        ? field.value.filter(
                              (value: string) => value !== option,
                          )
                        : [...field.value, option]

                return (
                    <FormGroup>
                        {options.map(option => (
                            <FormControlLabel
                                key={option}
                                control={
                                    <Checkbox
                                        checked={field.value.includes(option)}
                                        onChange={() =>
                                            field.onChange(onSelected(option))
                                        }
                                    />
                                }
                                label={option}
                                {...other}
                            />
                        ))}
                    </FormGroup>
                )
            }}
        />
    )
}
