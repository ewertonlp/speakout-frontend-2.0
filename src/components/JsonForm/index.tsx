import { Button, Grid, GridSize } from '@mui/material'
import Form from '@rjsf/mui'
import {
    ObjectFieldTemplatePropertyType,
    ObjectFieldTemplateProps,
    RJSFSchema,
    RegistryWidgetsType,
    UiSchema,
} from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import AddressController from 'controllers/addressController'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'styles/Form.module.css'
import { ISchemaForm } from 'types/ISchemaForm'
import CustomSelect from '../CustomSelect'
import CustomTextarea from '../CustomTextarea'
import TextWidgetWithMask from '../TextWidgetWithMask'
import { Container, FormWrapper } from './styles'

interface Props {
    schemaForm: ISchemaForm[]
    values?: any
    onSubmit: (data) => void
    customOnChange?: (data) => void
    msgSuccess: string
}

type JSONValue = string | string[] | number | boolean | JSONObject

interface JSONObject {
    [x: string]: JSONValue
}

export function formError(errorObj: any, enqueueSnackBack: any) {
    if (errorObj && errorObj.response?.data?.error?.details?.errors) {
        let msg = ''
        const { errors } = errorObj.response?.data?.error?.details
        if (errors && errors.length) {
            errors.forEach(err => {
                msg += `${err.path.join(', ')}: ${err.message}`.toLocaleLowerCase()
            })
            enqueueSnackBack(msg, {
                variant: 'error',
            })
        }
    } else {
        enqueueSnackBack(errorObj.message, {
            variant: 'error',
        })
    }
}

export default function JsonForm({ schemaForm, values, onSubmit, msgSuccess, customOnChange }: Props) {
    const [schema, setSchema] = useState<RJSFSchema>([])
    const [uiSchema, setUiSchema] = useState<UiSchema>()
    const [formData, setFormData] = useState<any>()
    const router = useRouter()

    function transformErrors(errors: any) {
        return errors.map((error: any) => {
            if (error.name === 'required') {
                error.message = 'Esse campo deve ser preenchido'
            }

            if (error.name === 'pattern') {
                error.message = 'Somente números '
            }
            return error
        })
    }

    const widgets: RegistryWidgetsType = {
        TextWidgetWithMask: TextWidgetWithMask,
        CustomTextarea: CustomTextarea,
        CustomSelect: CustomSelect,
    }

    const getAddressByCep = async (cep: string) => {
        try {
            const addressController = new AddressController()
            const res = await addressController.getCep(cep)
            setFormData(old => ({
                ...old,
                cep: res.cep,
                street: res.street,
                district: res.district,
                city: res.city,
                uf: res.uf,
            }))
        } catch (error) {
            console.log(error)
        }
    }

    function onChange(formItems: any) {
        if (formItems.formData.cep != undefined && formItems.formData.cep.length == 10) {
            getAddressByCep(formItems.formData.cep)
        }

        setFormData(formItems.formData)
    }

    const loadSchema = () => {
        const propsSchema = {}
        schemaForm.forEach(schema => {
            propsSchema[schema.name] = {}
            for (const [key, value] of Object.entries(schema.props)) {
                propsSchema[schema.name][key] = value
            }
        })

        const uiSchemaForm = {}
        schemaForm.forEach(schema => {
            uiSchemaForm[schema.name] = {}
            for (const [key, value] of Object.entries(schema.uiSchema)) {
                const keyCustom = `ui:${key}`
                uiSchemaForm[schema.name][keyCustom] = value
            }
        })

        const schemaLoaded: RJSFSchema = {
            type: 'object',
            required: schemaForm.filter(sf => sf.required).map(sf => sf.name),
            properties: propsSchema,
            uiSchema: uiSchemaForm,
        }
        setUiSchema(uiSchemaForm)
        setSchema(schemaLoaded)
        return schemaLoaded
    }

    const formatAddressObjectInitialValues = () => {
        if (values && values.address) {
            values.cep = values.address.cep
            values.street = values.address.street
            values.district = values.address.district
            values.city = values.address.city
            values.uf = values.address.uf
            values.number = values.address.number
            values.complement = values.address.complement || ''
        }
    }

    const formatAddressObjectSubmit = () => {
        if (!formData.cep) {
            return formData
        }
        const payload = {
            ...formData,
            address: {
                cep: formData.cep,
                street: formData.street,
                district: formData.district,
                city: formData.city,
                uf: formData.uf,
                complement: formData.complement || '',
                number: formData.number,
            },
        }

        Object.keys(payload).forEach(key => {
            if (!payload[key]) {
                payload[key] = ''
            }
        })

        return payload
    }

    const submitForm = () => {
        if (!formData) {
            return
        }

        const payload = formatAddressObjectSubmit()
        onSubmit(payload)
    }

    useEffect(() => {
        loadSchema()
        if (values) {
            Object.keys(values).forEach(key => {
                if (!values[key]) {
                    values[key] = ''
                }
            })
            formatAddressObjectInitialValues()
            setFormData(values)
        }
    }, [])

    return (
        <Container>
            <FormWrapper>
                {uiSchema && schema && (
                    <Form
                        autoComplete="off"
                        schema={schema}
                        noHtml5Validate
                        showErrorList={false}
                        validator={validator}
                        formData={formData}
                        uiSchema={uiSchema}
                        onSubmit={submitForm}
                        onChange={customOnChange ? customOnChange : onChange}
                        transformErrors={transformErrors}
                        widgets={widgets}
                        templates={{ ObjectFieldTemplate }}
                    >
                        <Grid container justifyContent={'flex-end'} sx={{ padding: '15px 0' }}>
                            <Button onClick={() => router.back()} variant="outlined">
                                Voltar
                            </Button>
                            <Button variant="contained" sx={{ marginLeft: '15px', marginRight: '20px' }} type="submit">
                                Salvar
                            </Button>
                        </Grid>
                    </Form>
                )}
            </FormWrapper>
        </Container>
    )
}

function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
    const getUi = (elementName: string): GridSize => {
        const ui = props.schema?.uiSchema[elementName]['ui:options']?.ui
        if (ui) {
            return ui
        }
        return 0
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <Grid container spacing={2}>
                {props.properties.map((element: ObjectFieldTemplatePropertyType, index: number) => (
                    <Grid key={index} item xs={12} md={getUi(element.name)}>
                        {element.content}
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 100%;
    padding: 20px;
    gap: 16px;
`
