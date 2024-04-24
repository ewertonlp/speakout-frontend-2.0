import { Controller, useFormContext } from 'react-hook-form'

import { Autocomplete, autocompleteClasses, TextField, TextFieldProps } from '@mui/material'
import { ApolloFormSchemaItem, ApolloFormSchemaOptions } from '../apollo-form/ApolloForm.component'
import Iconify from '../iconify/Iconify'
import { useTheme } from '@mui/material/styles'

interface IProps {
    name: string
    options: ApolloFormSchemaOptions[]
    defaultValue: ApolloFormSchemaOptions
}

export default function RHFAutoComplete({
    name,
    options,
    defaultValue,
    ...other
}: IProps & TextFieldProps & ApolloFormSchemaItem) {
    const { control } = useFormContext()
    const { label } = other
    const theme = useTheme()
    const backgroundColor =
        theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.paper
    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'
    //@TODO Atualmente o reactHookForm não trata esse campo como required, logo
    // fizemos o tratamento manual em ApolloForm.component > onSubmitCustom
    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: other.required,
            }}
            render={({ field: { onChange, value } }) => (
                <Autocomplete
                    multiple={false}
                    freeSolo={false}
                    options={options}
                    getOptionLabel={(option: ApolloFormSchemaOptions) => option?.label || ''}
                    isOptionEqualToValue={(option: ApolloFormSchemaOptions, value: ApolloFormSchemaOptions) =>
                        option ? option.value === value.value : false
                    }
                    groupBy={option => option?.group || 'Sem Grupo'}
                    popupIcon={<Iconify icon={'ic:baseline-search'} width={25} height={25} />}
                    sx={{
                        borderRadius: '10px',
                            backgroundColor: backgroundColor,
                            border: `1px solid ${borderColor}`,
                        [`& .${autocompleteClasses.popupIndicator}`]: {
                            transform: 'none',
                        },
                        textTransform: 'none',
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label={label}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'disabled',
                            }}
                            required={other.required}
                            error={control._formState.submitCount > 0 && other.required && !value}
                            helperText={
                                !value &&
                                control._formState.submitCount > 0 &&
                                other.required &&
                                `${other.label} é obrigatório`
                            }
                            autoComplete="false"
                        />
                    )}
                    onChange={(event, values, reason) => {
                        onChange(values)
                        if (other.onChangeSelectSearch) {
                            other.onChangeSelectSearch(values)
                        }
                    }}
                    value={value}
                    defaultValue={defaultValue}
                />
            )}
        />
    )
}
