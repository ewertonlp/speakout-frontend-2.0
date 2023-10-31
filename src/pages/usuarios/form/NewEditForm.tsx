import { AreaController } from 'controllers/areaController'
import UserController from 'controllers/userController'
import { UserFormSchema } from 'formSchemas/userFormSchema'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ApolloForm, ApolloFormSchemaItem } from 'src/components'
import { formError } from 'src/components/JsonForm'
import SelectWithCheckboxes from 'src/components/SelectWithCheckboxes'
import { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { ISelectOption } from 'types/ISelectOption'
import { ISelectValue } from 'types/ISelectValue'

type UserNewEditForm = {
    values?: any
    customValues?: any
    editMode?: boolean
    areas?: string[]
}

const NewEditForm = ({ values, customValues, editMode, areas = [] }: UserNewEditForm) => {
    const router = useRouter()

    const { tenantId } = useAuthContext()

    const [selectValue, setSelectValue] = useState<string[]>(areas)
    const [selectOptions, setSelectOptions] = useState<ISelectValue[]>([])

    const [roleOptions, setRoleOptions] = useState<ISelectValue[]>()

    const formSchema: ApolloFormSchemaItem[] = [
        ...UserFormSchema,
        {
            name: 'password',
            required: !editMode ? true : false,
            label: 'Senha',
            componenttype: editMode ? ApolloFormSchemaComponentType.HIDDEN : ApolloFormSchemaComponentType.PASSWORD,
            ui: { grid: 6 },
        },
        {
            name: 'confirmPassword',
            required: !editMode ? true : false,
            label: 'Confirmar senha',
            componenttype: editMode ? ApolloFormSchemaComponentType.HIDDEN : ApolloFormSchemaComponentType.PASSWORD,
            ui: { grid: 6 },
        },
        {
            name: 'blocked',
            label: 'Bloqueado',
            ui: { grid: 6 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                { value: 'false', label: 'Não' },
                { value: 'true', label: 'Sim' },
            ],
        },
        {
            name: 'role',
            label: 'Selecione o cargo',
            ui: { grid: 6 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: roleOptions,
        },
        {
            name: 'areas',
            required: false,
            label: 'Áreas de atuação',
            ui: { grid: 6 },
            renderComponent(params) {
                return (
                    <SelectWithCheckboxes
                        label="Áreas de atuação"
                        options={selectOptions}
                        value={selectValue}
                        setValue={setSelectValue}
                        initialValue={areas}
                    />
                )
            },
        },
    ]

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async data => {
        data = {
            ...data,
            areas: selectValue,
            tenant: tenantId,
        }
        setLoading(true)
        try {
            const userController = new UserController()
            if (data.id) {
                delete data.password
                await userController.update(data.id, data)
                enqueueSnackbar('Oba! Usuário editado com sucesso!', { variant: 'success' })
            } else {
                delete data.id
                if (data.password != data.confirmPassword) {
                    enqueueSnackbar('Ops! As senhas não coincidem', { variant: 'error' })
                    return
                }
                await userController.create(data)
                enqueueSnackbar(
                    'Oba! Cadastro realizado com sucesso! Um email de confirmação foi enviado para o usuário',
                    {
                        variant: 'success',
                        autoHideDuration: null,
                    },
                )
            }
            router.push('/usuarios')
        } catch (error) {
            formError(error, enqueueSnackbar)
        }
        setLoading(false)
    }

    const getAreas = async () => {
        setLoading(true)
        const areaController = new AreaController()
        try {
            const areas = (await areaController.getAll()).data
            const selectOptions: ISelectOption[] = []
            areas.map(area => selectOptions.push({ label: area.description, value: area.id! }))
            setSelectOptions(selectOptions)
        } catch (error) {
            enqueueSnackbar('Erro ao recuperar áreas de atuação', {
                variant: 'error',
                autoHideDuration: null,
            })
        }
        setLoading(false)
    }

    const getRoleOptions = async () => {
        setLoading(true)
        const userController = new UserController()
        try {
            const roles = (await userController.getAllRoles()).roles
            const roleOptions: ISelectOption[] = []
            roles.map(role => roleOptions.push({ label: role.name, value: role.id! }))
            setRoleOptions(roleOptions)
        } catch (error) {
            enqueueSnackbar('Erro ao recuperar cargos', {
                variant: 'error',
                autoHideDuration: null,
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        getAreas()
        getRoleOptions()
    }, [])

    const [loading, setLoading] = useState(false)

    return (
        <>
            {loading && <LoadingScreen />}
            <ApolloForm
                schema={formSchema}
                initialValues={values}
                onSubmit={onSubmit}
                submitButtonText="Salvar"
                onCancel={() => router.push('/usuarios')}
                showCancelButtom={true}
                defaultExpandedGroup={true}
                customValues={customValues}
            />
        </>
    )
}

export default NewEditForm
