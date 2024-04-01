import { Grid } from '@mui/material'
import { AreaController } from 'controllers/areaController'
import { AreaFormSchema } from 'formSchemas/areaFormSchema'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ApolloForm } from 'src/components'
import { formError } from 'src/components/JsonForm'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'

type UserNewEditForm = {
    values?: any
    customValues?: any
}

const NewEditForm = ({ values, customValues }: UserNewEditForm) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const { tenantId } = useAuthContext()
    const [openModal, setOpenModal] = useState(true)

    const onSubmit = async data => {
        setLoading(true)
        data = {
            ...data,
            tenant: tenantId,
        }

        try {
            const areaController = new AreaController()
            if (data.id) {
                await areaController.update(data, data.id)
                enqueueSnackbar('Área editada com sucesso!', { variant: 'success' })
            } else {
                delete data.id
                await areaController.create(data)
                enqueueSnackbar('Cadastro realizado com sucesso!', {
                    variant: 'success',
                    // autoHideDuration: null,
                })
            }
            router.push('/areasdeatuacao')
        } catch (error) {
            formError(error, enqueueSnackbar)
        }
        setLoading(false)
    }

    const [loading, setLoading] = useState(false)

    return (
        <Grid sx={{display: 'flex', justifyContent:'center', }}>
            {loading && <LoadingScreen />}
            <ApolloForm
                schema={AreaFormSchema}
                initialValues={values}
                onSubmit={onSubmit}
                submitButtonText="Salvar"
                onCancel={() => router.push('/areasdeatuacao')}
                showCancelButtom={true}
                defaultExpandedGroup={true}
                customValues={customValues}
            />
        </Grid>
    )
}

export default NewEditForm
