import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Card, Divider, Grid, GridSize, IconButton, IconButtonProps, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { getDefaultValues } from './utils/getDefaultValues'
import { getInitialValues } from './utils/getInitialValues'
import { getValidationSchema } from './utils/getValidationSchema'

import { FormProvider } from '../hook-form'

import { useRouter } from 'next/router'
import { ApolloField } from './ApolloField'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'
import { Variant } from '@mui/material/styles/createTypography'
import { useSnackbar } from 'notistack'
import useResponsive from '../../hooks/useResponsive'

export interface ApolloFormSchemaCustomOptions {
    name: string
    options?: { label: string; value: string }[]
}

export interface ApolloFormSchemaDisabledFields {
    name: string
    disabled: boolean
}

export interface ApolloFormSchemaTranslateFields {
    name: string
    label: string
    description?: string
}

export interface ApolloFormSchemaCustomOnBlur {
    name: string
    onBlur?: (e: any) => void
}

export interface ApolloFormSchemaDefaultValues {
    name: string
    value: any
}

export interface ApolloFormSchemaCustomValues {
    name: string
    value: any
}

export interface ApolloFormSchemaGroup {
    name: string
    key: string
    type: 'label' | 'collapse'
    visible?: boolean
    variant?: Variant
    divider?: boolean
    subgroup?: string
}

export interface ApolloFormSchemaOptions {
    value: string | null
    label: string
    group?: string
}

export interface ApolloFormSchemaItem {
    groupKey?: string
    name: string
    label: string
    mask?: string
    required?: boolean
    componenttype?: ApolloFormSchemaComponentType
    options?: ApolloFormSchemaOptions[]
    ui: ApolloFormSchemaUI
    defaultValue?: any
    maxDate?: Date
    additionalProperties?: ApolloFormSchemaItemAdditionalProperties
    MaximumLength?: number
    MinimumLength?: number
    fieldtype?: string | null
    renderComponent?: (params: any) => any
    onBlur?: (e: any) => void
    onChange?: (e: any) => void
    onClick?: (e: any) => void
    onKeyUp?: (e: any) => void
    description?: string
    captionTranslateKey?: string
    disabled?: boolean
    hide?: boolean
    onChangeSelectSearch?: (e: any) => void
}

export interface ApolloFormSchemaItemAdditionalProperties {
    addable?: boolean
    newFunc?: () => React.ReactElement
    edit?: boolean
    editFunc?: () => React.ReactElement
    editTextButtom?: string
}

export interface ApolloFormSchemaUI {
    grid: number
}

export enum ApolloFormSchemaComponentType {
    TEXT,
    HIDDEN,
    SELECT,
    SELECTSEARCH,
    RADIOGROUP,
    CHECKBOX,
    TEXTAREA,
    NUMBER,
    CURRENCY,
    DATE,
    DATETIME,
    EMAIL,
    DECIMAL,
    PASSWORD,
    SWITCH,
    PERCENTAGE,
}

export interface CustomButtonsForm {
    label: string
    action: () => void
    disabled?: boolean
    variant?: 'contained' | 'outlined'
    order?: number
    color?: 'inherit' | 'error' | 'warning' | 'success' | 'info' | 'primary' | 'secondary'
}

export interface OrderDisplayButtonsForm {
    identity: 'submitButton' | 'cancelButton'
    order: number
}

export interface ApolloFormProps {
    groups?: ApolloFormSchemaGroup[]
    schema: ApolloFormSchemaItem[]
    initialValues?: any
    isEdit?: boolean
    editId?: string | number
    onSubmit?: any
    onCancel?: any
    submitButtonText?: string
    disableForm?: boolean
    isFilter?: boolean
    showFilterButtons?: boolean
    withBox?: boolean
    childItem?: any[]
    customValues?: ApolloFormSchemaCustomValues[]
    cancelPath?: string
    defaultExpandedGroup?: boolean
    showCancelButtom?: boolean
    cancelButtonTitle?: string
    filterClean?: () => void
    cancelAction?: () => void
    customButtons?: CustomButtonsForm[]
    orderButtons?: OrderDisplayButtonsForm[]
    noRenderCardInForm?: boolean
    gridSize?: GridSize
}

export function formError(error: any, enqueueSnackbar: any) {
    if (!error) {
        enqueueSnackbar('Erro de comunicação com o servidor, por favor tente novamente mais tarde.', {
            variant: 'error',
            autoHideDuration: 9000,
        })
    } else if (error.formError) {
        enqueueSnackbar(error.formError, {
            variant: 'error',
            autoHideDuration: 9000,
        })
    } else if (error.isAxiosError) {
        enqueueSnackbar('Erro de comunicação com o servidor, por favor tente novamente mais tarde.', {
            variant: 'error',
            autoHideDuration: 9000,
        })
    } else if (error.status == 404) {
        enqueueSnackbar('Dados não encontrados.', {
            variant: 'warning',
            autoHideDuration: 9000,
        })
    } else if (error.status == 504) {
        enqueueSnackbar('O servidor não conseguiu processar sua solicitação no tempo esperado.', {
            variant: 'error',
            autoHideDuration: 9000,
        })
    } else if (error.data?.errors) {
        const messages: string[] = []

        Object.keys(error.data.errors).forEach((element: any, index: number) => {
            messages.push(error.data.errors[element][0])
        })

        const errorMessages = messages.join(' ')

        enqueueSnackbar(`Erro ao tentar salvar registro: ${errorMessages} `, {
            variant: 'error',
            autoHideDuration: 9000,
        })
    } else if (error.response?.data?.messages) {
        const errorMessages = error.response.data?.messages?.join(' ')
        enqueueSnackbar(`Erro ao tentar salvar registro: ${errorMessages} `, {
            variant: 'error',
            autoHideDuration: 9000,
        })
    } else if (error.data?.messages) {
        const errorMessages = error.data?.messages?.join(' ')
        enqueueSnackbar(`Erro ao tentar salvar registro: ${errorMessages} `, {
            variant: 'error',
            autoHideDuration: 9000,
        })
    } else if (error.status == 400) {
        enqueueSnackbar('Erro de requisição do cliente com o servidor. Comunique o Administrador.', {
            variant: 'error',
            autoHideDuration: 9000,
        })
    } else {
        enqueueSnackbar('Ops! É necessário preencher todos os campos destacados antes de enviar.', {
            variant: 'error',
            autoHideDuration: 9000,
        })
        console.error(error)
    }
}

export function getCustomFormSchema(
    formSchema: ApolloFormSchemaItem[],
    customOptions?: ApolloFormSchemaCustomOptions[],
    defaultValues?: ApolloFormSchemaDefaultValues[],
    customOnBlur?: ApolloFormSchemaCustomOnBlur[],
    disabledFields?: ApolloFormSchemaDisabledFields[],
    translateFields?: ApolloFormSchemaTranslateFields[],
): ApolloFormSchemaItem[] {
    const newFormSchema: ApolloFormSchemaItem[] = []

    formSchema.forEach((formSchemaItem: ApolloFormSchemaItem) => {
        customOptions?.forEach((customOptionItem: ApolloFormSchemaCustomOptions) => {
            if (formSchemaItem.name === customOptionItem.name) {
                formSchemaItem.options = [{ label: 'Nenhum', value: '' }]
                customOptionItem.options?.forEach((option: { label: string; value: string }) => {
                    formSchemaItem.options?.push(option)
                })
            }
        })

        defaultValues?.forEach((defaultValueItem: ApolloFormSchemaDefaultValues) => {
            if (formSchemaItem.name === defaultValueItem.name) {
                formSchemaItem.defaultValue = defaultValueItem.value
            }
        })

        customOnBlur?.forEach((onBlurItem: ApolloFormSchemaCustomOnBlur) => {
            if (formSchemaItem.name === onBlurItem.name) {
                formSchemaItem.onBlur = onBlurItem.onBlur
            }
        })

        disabledFields?.forEach((disabledItem: ApolloFormSchemaDisabledFields) => {
            if (formSchemaItem.name === disabledItem.name) {
                formSchemaItem.disabled = disabledItem.disabled
            }
        })

        translateFields?.forEach((translateItem: ApolloFormSchemaTranslateFields) => {
            if (formSchemaItem.name === translateItem.name) {
                formSchemaItem.label = translateItem.label
                formSchemaItem.description = translateItem.description
            }
        })

        newFormSchema.push(formSchemaItem)
    })

    return newFormSchema
}

const ApolloForm: React.FC<ApolloFormProps> = ({
    groups,
    schema,
    initialValues,
    onSubmit,
    onCancel,
    submitButtonText,
    isEdit,
    isFilter,
    showFilterButtons,
    withBox,
    childItem,
    customValues,
    cancelPath,
    showCancelButtom,
    cancelButtonTitle,
    defaultExpandedGroup = false,
    filterClean,
    cancelAction,
    customButtons,
    orderButtons,
    gridSize,
    noRenderCardInForm,
}) => {
    const isDesktop = useResponsive('up', 'lg')

    const defaultValues = getDefaultValues(schema)
    const validationSchema = getValidationSchema(schema)
    const formInitialValues = getInitialValues(defaultValues, initialValues)

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formInitialValues,
        mode: 'onBlur',
        values: initialValues,
    })
    const router = useRouter()
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
    } = methods
    const [keyValuesGroups, setKeyValuesGroups] = useState<{ key: string; value: boolean }[]>(
        groups
            ? groups
                  ?.filter((filter: ApolloFormSchemaGroup) => filter.type === 'collapse')
                  .map((group: ApolloFormSchemaGroup) => ({
                      key: group.key,
                      value: defaultExpandedGroup,
                  }))
            : [],
    )

    const onSubmitCustom = async (values: any, { setSubmitting }: any) => {
        let validateRequiredValues = false
        for (const prop in values) {
            const element = schema.find(itemSchema => itemSchema.name == prop)
            if (
                element?.required &&
                element?.componenttype == ApolloFormSchemaComponentType.SELECTSEARCH &&
                (values[prop] == '' || values[prop] == undefined)
            ) {
                validateRequiredValues = true
            }
        }

        if (validateRequiredValues) {
            return enqueueSnackbar('Por favor, preencha os itens destacados no formulário', { variant: 'error' })
        }
        const item = schema.filter(
            item =>
                item.componenttype == ApolloFormSchemaComponentType.CURRENCY ||
                item.componenttype == ApolloFormSchemaComponentType.PERCENTAGE,
        )
        if (item.length) {
            item.forEach(element => {
                values[element.name] = values[element.name].replace(',', '.')
            })
        }
        onSubmit(values, { setSubmitting })
    }

    useEffect(() => {
        if (isEdit && initialValues) {
            reset(initialValues)
        }
        if (!isEdit) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, initialValues])

    useEffect(() => {
        if (customValues) {
            customValues.forEach((item: ApolloFormSchemaCustomValues) => {
                const value = typeof item.value == 'number' ? item.value.toString() : item.value
                setValue(item.name, value)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customValues])
    // Render form fields

    const handleExpandClick = (key: string) => {
        const values: { key: string; value: boolean }[] = []

        keyValuesGroups.forEach((item: any) => {
            if (item.key === key) {
                values.push({
                    key: item.key,
                    value: !item.value,
                })
            } else {
                values.push({
                    key: item.key,
                    value: item.value,
                })
            }
        })

        setKeyValuesGroups(values)
    }

    const getExpandedGroup = (key: string): boolean => {
        const exists = keyValuesGroups.filter((filter: any) => filter.key === key)

        if (exists && exists[0]) {
            return exists[0].value
        }

        return defaultExpandedGroup
    }

    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean
    }

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props
        return <IconButton {...other} />
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }))

    const renderFieldGroups = (itemGroup: ApolloFormSchemaGroup) => (
        <>
            {schema
                ?.filter(
                    (itemFilter: ApolloFormSchemaItem) =>
                        itemFilter.groupKey && itemFilter.groupKey === itemGroup.key && !itemFilter.hide,
                )
                ?.map(
                    (item: ApolloFormSchemaItem, index: number) =>
                        (!item.renderComponent && <ApolloField formField={item} key={index} isDesktop={isDesktop} />) ||
                        (initialValues && item.renderComponent && (
                            <Grid item xs={12} md={item.ui.grid || 12}>
                                {item?.renderComponent(initialValues)}
                            </Grid>
                        )) || <></>,
                )}
        </>
    )

    const templateRenderField = (itemGroup: ApolloFormSchemaGroup, index: number) => (
        <Grid
            item
            xs={12}
            visibility={itemGroup.visible == false ? 'hidden' : 'visible'}
            sx={{ display: itemGroup.visible == false ? 'none' : 'block' }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant={itemGroup.variant || 'h4'} gutterBottom>
                        {itemGroup.name}
                    </Typography>
                </Box>
                {itemGroup.type == 'collapse' && (
                    <Box sx={{ flexShrink: 0 }}>
                        <ExpandMore
                            expand={getExpandedGroup(itemGroup.key)}
                            onClick={() => handleExpandClick(itemGroup.key)}
                            aria-expanded={getExpandedGroup(itemGroup.key)}
                            aria-label="show more"
                            key={index}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </Box>
                )}
            </Box>

            {(itemGroup.divider == true || itemGroup.divider == undefined) && <Divider sx={{ my: 0 }} />}
        </Grid>
    )

    const renderSubGroups = (groups, itemGroup, index) => {
        const subgroups = groups.filter(group => group.subgroup && group.subgroup == itemGroup.key)
        if (!subgroups || !subgroups.length) {
            return
        }

        if (itemGroup.type == 'label') {
            return subgroups.map(subgroup => (
                <>
                    {templateRenderField(subgroup, index)}
                    {renderFieldGroups(subgroup)}
                </>
            ))
        } else {
            return subgroups.map(subgroup => (
                <>
                    {getExpandedGroup(itemGroup.key) && (
                        <>
                            {templateRenderField(subgroup, index)}
                            {renderFieldGroups(subgroup)}
                        </>
                    )}
                </>
            ))
        }
    }

    const renderFields = () => (
        <>
            {/* Carregamento dos campos do formulario sem grupos*/}

            {schema
                ?.filter((itemFilter: ApolloFormSchemaItem) => !itemFilter.groupKey && !itemFilter.hide)
                .map(
                    (item: ApolloFormSchemaItem, index: number) =>
                        (!item.renderComponent && <ApolloField formField={item} key={index} isDesktop={isDesktop} />) ||
                        (initialValues && item.renderComponent && item.renderComponent(initialValues)) || <></>,
                )}

            {/* Carregamento dos campos do formulario com grupos*/}
            {groups &&
                groups?.map((itemGroup: ApolloFormSchemaGroup, index: number) => (
                    <>
                        {itemGroup.type === 'label' && !itemGroup.subgroup ? (
                            <>
                                {templateRenderField(itemGroup, index)}

                                {renderFieldGroups(itemGroup)}
                                {renderSubGroups(groups, itemGroup, index)}
                            </>
                        ) : (
                            !itemGroup.subgroup && (
                                <>
                                    {templateRenderField(itemGroup, index)}

                                    {getExpandedGroup(itemGroup.key) && renderFieldGroups(itemGroup)}
                                    {renderSubGroups(groups, itemGroup, index)}
                                </>
                            )
                        )}
                    </>
                ))}
            {/*Renderizar componentes customizados dentro do formulario*/}
            {childItem &&
                childItem.map((child: any, index: number) => (
                    <Grid item xs={12} key={`child_${index}`}>
                        {child}
                    </Grid>
                ))}
        </>
    )

    function handleCancel() {
        if (onCancel != null) {
            onCancel()
        } else {
            cancelPath ? router.push(cancelPath) : router.back()
        }
    }

    const { enqueueSnackbar } = useSnackbar()

    const onError = (errors, e) => {
        formError(errors, enqueueSnackbar)
    }

    // Render form componentes
    const renderForm = (withBox?: boolean) => (
        <Grid container spacing={4}>
            {renderFields()}
            <Grid item xs={12}>
                <Box sx={{ mb: 0, display: 'flex' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ flexShrink: 0 }}>
                            <Grid container spacing={2}>
                                {filterClean && (
                                    <Grid item>
                                        <Button onClick={filterClean} variant="contained" color="inherit">
                                            Limpar filtros
                                        </Button>
                                    </Grid>
                                )}

                                {!isFilter && showCancelButtom && (
                                    <Grid
                                        item
                                        order={
                                            orderButtons?.find(button => button.identity == 'cancelButton')?.order || 0
                                        }
                                    >
                                        <Button onClick={() => handleCancel()} variant="contained" color="inherit">
                                            {cancelButtonTitle ? cancelButtonTitle : 'Cancelar'}
                                        </Button>
                                    </Grid>
                                )}
                                {onSubmit && (
                                    <Grid
                                        item
                                        order={
                                            orderButtons?.find(button => button.identity == 'submitButton')?.order || 0
                                        }
                                    >
                                        <LoadingButton
                                            onClick={handleSubmit(onSubmitCustom, onError)}
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            loading={isSubmitting}
                                        >
                                            {submitButtonText ? submitButtonText : 'Salvar'}
                                        </LoadingButton>
                                    </Grid>
                                )}
                                {customButtons &&
                                    customButtons.length &&
                                    customButtons.map((customButtom, index) => (
                                        <Grid item order={customButtom.order || 0} key={index}>
                                            <Button
                                                variant={customButtom.variant || 'contained'}
                                                color={customButtom.color || 'primary'}
                                                onClick={customButtom.action}
                                                disabled={customButtom.disabled || false}
                                            >
                                                {customButtom.label}
                                            </Button>
                                        </Grid>
                                    ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )

    return (
        <Box style={{ width: '100%', height: '100%' }}>
            <FormProvider methods={methods}>
                {withBox ? (
                    <Box sx={{ p: 2 }}>{renderForm(withBox)}</Box>
                ) : noRenderCardInForm ? (
                    renderForm(withBox)
                ) : (
                    <Card sx={{ p: 2 }}>
                        <Grid container>
                            <Grid item xs={!isDesktop ? 12 : gridSize || 12}>
                                {renderForm(withBox)}
                            </Grid>
                        </Grid>
                    </Card>
                )}
            </FormProvider>
        </Box>
    )
}

export default ApolloForm
