import { Controller, useFormContext } from 'react-hook-form'

import {
    FormControlLabel,
    FormControlLabelProps,
    Switch,
    Tooltip,
} from '@mui/material'
import { useState } from 'react'

type IProps = Omit<FormControlLabelProps, 'control'>

interface Props extends IProps {
    name: string
    disabled?: boolean
    description?: string
}

export default function RHFSwitch({ name, disabled = false, ...other }: Props) {
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
                            <Switch
                                onMouseLeave={() => setTooltipOpen(false)}
                                onMouseEnter={() => setTooltipOpen(true)}
                                {...field}
                                checked={field.value}
                                disabled={disabled}
                            />
                        </Tooltip>
                    )}
                />
            }
            {...other}
        />
    )
}
