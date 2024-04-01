import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import UserController from 'controllers/userController'
import { UserTempFormSchema } from 'formSchemas/userTempFormSchema'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ApolloForm, ApolloFormSchemaItem } from 'src/components'
import { formError } from 'src/components/JsonForm'
import { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useTheme } from '@mui/material/styles'

type UserNewEditForm = {
    values?: any
    customValues?: any
    editMode?: boolean
}

const useStyles = makeStyles(theme => ({
    gridContainer: {
        minHeight: '50vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%',  
        borderRadius: '10px'
    },
}))

const NewUserTemp = ({ values, customValues, editMode }: UserNewEditForm) => {
    const router = useRouter()
    const classes = useStyles()
    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.default;

    const { tenantId } = useAuthContext()

    const formSchema: ApolloFormSchemaItem[] = [
        ...UserTempFormSchema,
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
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                { value: 'false', label: 'Não' },
                { value: 'true', label: 'Sim' },
            ],
        },
    ]

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async data => {
        data = {
            ...data,
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
                data.comite = true
                data.cpf = ""
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
            console.log(error)
        }
        setLoading(false)
    }

    const [loading, setLoading] = useState(false)

    return (
        <Grid container className={classes.gridContainer} style={{ backgroundColor: backgroundColor }}>
            {loading && <LoadingScreen />}
            <ApolloForm
                schema={formSchema}
                initialValues={values}
                onSubmit={onSubmit}
                submitButtonText="Cadastrar"
                onCancel={() => router.push('/usuarios')}
                showCancelButtom={true}
                defaultExpandedGroup={true}
                customValues={customValues}
            />
        </Grid>
    )
}

export default NewUserTemp
