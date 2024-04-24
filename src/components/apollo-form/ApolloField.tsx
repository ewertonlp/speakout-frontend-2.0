import React, { useState } from 'react'

import { Button, Dialog, DialogTitle, InputAdornment, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'
import CurrencyFormat from 'react-currency-format'
import { Controller, useFormContext } from 'react-hook-form'
import { RHFCheckbox, RHFRadioGroup, RHFSelect, RHFSwitch, RHFTextField } from '../hook-form'
import RHFAutoComplete from '../hook-form/RHFAutoComplete'
import RHFDatePicker from '../hook-form/RHFDatePicker'
import RHFDateTimePicker from '../hook-form/RHFDateTimePicker'
import Iconify from '../iconify/Iconify'
import { ApolloFormSchemaComponentType, ApolloFormSchemaItem } from './ApolloForm.component'
interface ApolloFieldProps {
    formField: ApolloFormSchemaItem
    values?: any
    isDesktop?: boolean
}

export const ApolloField: React.FC<ApolloFieldProps> = ({ formField, isDesktop }: ApolloFieldProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const theme = useTheme()
    const backgroundColor =
        theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.paper

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'
    const { setValue } = useFormContext()

    const [showPassword, setShowPassword] = useState(false)

    if (!formField) return <></>

    const components = [
        { componenttype: ApolloFormSchemaComponentType.TEXT },
        { componenttype: ApolloFormSchemaComponentType.HIDDEN },
        { componenttype: ApolloFormSchemaComponentType.SELECT },
        { componenttype: ApolloFormSchemaComponentType.SELECTSEARCH },
        { componenttype: ApolloFormSchemaComponentType.RADIOGROUP },
        { componenttype: ApolloFormSchemaComponentType.CHECKBOX },
        { componenttype: ApolloFormSchemaComponentType.TEXTAREA },
        { componenttype: ApolloFormSchemaComponentType.NUMBER },
        { componenttype: ApolloFormSchemaComponentType.CURRENCY },
        { componenttype: ApolloFormSchemaComponentType.PERCENTAGE },
        { componenttype: ApolloFormSchemaComponentType.DATE },
        { componenttype: ApolloFormSchemaComponentType.DATETIME },
        { componenttype: ApolloFormSchemaComponentType.EMAIL },
        { componenttype: ApolloFormSchemaComponentType.DECIMAL },
        { componenttype: ApolloFormSchemaComponentType.PASSWORD },
        { componenttype: ApolloFormSchemaComponentType.SWITCH },
    ]

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }

    const renderComponent = (field: any, fieldSchema: ApolloFormSchemaItem) => {
        if (!field) return <></>

        const component = components.find(
            (component: any) => component.componenttype === fieldSchema.componenttype,
        )?.componenttype

        switch (component) {
            case ApolloFormSchemaComponentType.TEXT:
                return (
                    <RHFTextField
                        {...fieldSchema}
                        {...field}
                        inputProps={
                            fieldSchema.MaximumLength && {
                                maxLength: fieldSchema.MaximumLength,
                            }
                        }
                        onBlur={fieldSchema.onBlur}
                        onChange={(event: any) => {
                            setValue(fieldSchema.name, event.target.value)
                            if (fieldSchema.onChange) fieldSchema.onChange(event)
                        }}
                        style={{
                            borderRadius: '10px',
                            backgroundColor: backgroundColor,
                            border: `1px solid ${borderColor}`,
                        }}
                        placeholder="#000"
                    />
                )
            case ApolloFormSchemaComponentType.HIDDEN:
                return (
                    <input
                        type="hidden"
                        {...field}
                        name={field.name}
                        style={{
                            borderRadius: '10px',
                            backgroundColor: backgroundColor,
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.SELECT:
                return (
                    <RHFSelect
                        fullWidth
                        name={field.name}
                        label={`${fieldSchema.label}${fieldSchema.required ? ' *' : ''}`}
                        InputLabelProps={{ shrink: true }}
                        SelectProps={{
                            native: false,
                        }}
                        {...field}
                        onChange={(event: any) => {
                            setValue(fieldSchema.name, event.target.value)
                            if (fieldSchema.onChange) fieldSchema.onChange(event)
                        }}
                        disabled={fieldSchema.disabled}
                        style={{
                            borderRadius: '10px',
                            backgroundColor: backgroundColor,
                            border: `1px solid ${borderColor}`,
                        }}
                    >
                        {fieldSchema.options?.map((option: any) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                )
            case ApolloFormSchemaComponentType.SELECTSEARCH:
                return (
                    <RHFAutoComplete
                        {...fieldSchema}
                        {...field}
                        style={{
                            borderRadius: '10px',
                            backgroundColor: backgroundColor,
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.RADIOGROUP:
                return (
                    <>
                        <Typography variant="subtitle1">
                            {fieldSchema.label}
                            {fieldSchema.required ? ' *' : ''}
                        </Typography>
                        <RHFRadioGroup
                            {...fieldSchema}
                            {...field}
                            name={fieldSchema.name}
                            key={fieldSchema.name}
                            options={fieldSchema.options}
                            row={true}
                            onChange={(event: any) => {
                                setValue(fieldSchema.name, event.target.value)
                                if (fieldSchema.onChange) fieldSchema.onChange(event)
                            }}
                            disabled={fieldSchema.disabled}
                            style={{
                                borderRadius: '10px',
                                backgroundColor: backgroundColor,
                                border: `1px solid ${borderColor}`,
                            }}
                        />
                    </>
                )
            case ApolloFormSchemaComponentType.CHECKBOX:
                return (
                    <RHFCheckbox
                        {...fieldSchema}
                        {...field}
                        onClick={fieldSchema.onClick}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.TEXTAREA:
                return (
                    <RHFTextField
                        {...fieldSchema}
                        {...field}
                        inputProps={
                            fieldSchema.MaximumLength && {
                                maxLength: fieldSchema.MaximumLength,
                            }
                        }
                        onBlur={fieldSchema.onBlur}
                        multiline
                        rows={3}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.NUMBER:
                return (
                    <RHFTextField
                        {...fieldSchema}
                        {...field}
                        type="number"
                        required={fieldSchema.required}
                        pattern="^\d+(?:\.\d{1,2})?$"
                        inputProps={
                            fieldSchema.MaximumLength && {
                                maxLength: fieldSchema.MaximumLength,
                            }
                        }
                        disabled={fieldSchema.disabled && fieldSchema.disabled === true ? true : false}
                        onChange={(event: any) => setValue(fieldSchema.name, Number(event.target.value))}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.CURRENCY:
                return (
                    <CurrencyFormat
                        customInput={RHFTextField}
                        thousandSeparator={'.'}
                        prefix="R$ "
                        decimalSeparator={','}
                        decimalScale={2}
                        allowNegative={true}
                        {...field}
                        {...fieldSchema}
                        onKeyUp={event => {
                            if (event.key == 'Backspace' && event.target.value == '-') {
                                event.target.value = ''
                            }
                        }}
                        onChange={(event: any) => {
                            event.target.value = event.target.value.replace('R$ 0', 'R$ ')
                            event.target.value = event.target.value.replace(/[^0-9,-]/g, '')
                            setValue(fieldSchema.name, event.target.value)
                            if (fieldSchema && fieldSchema.onChange) {
                                fieldSchema.onChange(event.target.value)
                            }
                        }}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.PERCENTAGE:
                return (
                    <RHFTextField
                        {...fieldSchema}
                        {...field}
                        type="text"
                        onChange={(event: any) => {
                            event.target.value = event.target.value.replace(/[^0-9,-]/g, '')
                            setValue(fieldSchema.name, event.target.value)
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <Iconify icon={'mdi:percent'} />
                                </InputAdornment>
                            ),
                        }}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.DATE:
                return (
                    <RHFDatePicker
                        {...fieldSchema}
                        {...field}
                        onChange={fieldSchema.onChange}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.DATETIME:
                return (
                    <RHFDateTimePicker
                        {...fieldSchema}
                        {...field}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.EMAIL:
                return (
                    <RHFTextField
                        {...fieldSchema}
                        {...field}
                        type="email"
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.DECIMAL:
                return (
                    <RHFTextField
                        {...fieldSchema}
                        {...field}
                        type="number"
                        onChange={(event: any) => setValue(fieldSchema.name, Number(event.target.value))}
                        style={{
                            borderRadius: '10px',
                            backgroundColor: backgroundColor,
                            paddingx: '1rem',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            case ApolloFormSchemaComponentType.PASSWORD:
                // return <RHFTextField {...fieldSchema} {...field} type="password" />
                return (
                    <RHFTextField
                        {...fieldSchema}
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        style={{
                            borderRadius: '10px',
                            backgroundColor: backgroundColor,
                            paddingx: '1rem',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )

            case ApolloFormSchemaComponentType.SWITCH:
                return (
                    <RHFSwitch
                        {...fieldSchema}
                        {...field}
                        onClick={fieldSchema.onClick}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
            default:
                return (
                    <RHFTextField
                        {...fieldSchema}
                        {...field}
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                        }}
                    />
                )
        }
    }

    return (
        <Grid
            item
            xs={isDesktop ? formField.ui.grid : 12}
            key={formField.name}
            sx={{
                display: formField.componenttype == ApolloFormSchemaComponentType.HIDDEN ? 'none' : 'block',
            }}
        >
            <Controller key={formField.name} render={({ field }) => renderComponent(field, formField)} {...formField} />
            {formField.additionalProperties?.edit && (
                <>
                    <Button variant="text" style={{ textAlign: 'left', top: 5 }} onClick={() => setDialogOpen(true)}>
                        {formField.additionalProperties?.editTextButtom ? (
                            <>{formField.additionalProperties?.editTextButtom}</>
                        ) : (
                            <>Editar {formField.label}</>
                        )}
                    </Button>

                    <Dialog onClose={handleCloseDialog} open={dialogOpen}>
                        <DialogTitle>Editar {formField.label}</DialogTitle>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            {formField.additionalProperties.editFunc && formField.additionalProperties.editFunc()}
                        </div>

                        <Button variant="text" style={{ textAlign: 'left' }} onClick={handleCloseDialog}>
                            Fechar
                        </Button>
                    </Dialog>
                </>
            )}
            {formField.additionalProperties?.addable && (
                <>
                    <Button variant="text" style={{ textAlign: 'left' }} onClick={() => setDialogOpen(true)}>
                        Novo {formField.label}
                    </Button>
                    <Dialog onClose={handleCloseDialog} open={dialogOpen}>
                        <DialogTitle>Novo {formField.label}</DialogTitle>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            {formField.additionalProperties.newFunc && formField.additionalProperties.newFunc()}
                        </div>

                        <Button variant="text" style={{ textAlign: 'left' }} onClick={handleCloseDialog}>
                            Fechar
                        </Button>
                    </Dialog>
                </>
            )}
        </Grid>
    )
}
