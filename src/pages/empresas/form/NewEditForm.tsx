import { Grid, InputLabel, TextField } from '@mui/material'
import TenantController from 'controllers/tenantController'
import { UploadController } from 'controllers/uploadController'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { ApolloForm } from 'src/components'
import { ApolloFormSchemaComponentType, ApolloFormSchemaItem } from 'src/components/apollo-form/ApolloForm.component'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { ITenant } from 'types/ITenant'
type TenantForm = {
    values?: any
    customValues?: any
    currentLogoId?: string
    currentBannerId?: string
}

const NewEditForm = ({ values, customValues, currentBannerId, currentLogoId }: TenantForm) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const [logoFile, setLogoFile] = useState<File>()
    const [bannerFile, setBannerFile] = useState<File>()
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(true) 

    async function deleteImage(id: string) {
        const uploadController = new UploadController()
        try {
            uploadController.deleteFile(id)
        } catch (error) {
            console.log(error)
        }
    }

    async function createTenant(data: any) {
        const tenantController = new TenantController()
        const uploadController = new UploadController()

        setLoading(true)
        if (logoFile && bannerFile) {
            try {
                const logoId = (await uploadController.uploadFile(logoFile))[0].id
                const bannerId = (await uploadController.uploadFile(bannerFile))[0].id
                try {
                    delete data.id
                    const formattedData: ITenant = {
                        ...data,
                        logo: logoId,
                        banner: bannerId,
                    }

                    await tenantController.create(formattedData)
                    enqueueSnackbar(' Empresa criada com sucesso', { variant: 'success' })
                    router.push('/empresas')
                } catch (error) {
                    enqueueSnackbar('Erro ao cadastrar empresa', { variant: 'error' })
                }
            } catch (error) {
                console.log(error)
                enqueueSnackbar('Erro ao carregar imagens', { variant: 'error' })
            }

            setLoading(false)
        }
    }

    async function editTenant(data: any, id: string) {
        const tenantController = new TenantController()
        const uploadController = new UploadController()
        let logoId: string, bannerId: string
        setLoading(true)
        try {
            if (logoFile) logoId = (await uploadController.uploadFile(logoFile))[0].id
            else logoId = currentLogoId ?? '-1'

            if (bannerFile) bannerId = (await uploadController.uploadFile(bannerFile))[0].id
            else bannerId = currentBannerId ?? '-1'

            if (bannerId === '-1' || logoId === '-1') throw new Error('Selecione imagens para banner e logo')
            try {
                const formattedData: ITenant = {
                    ...data,
                    logo: logoId,
                    banner: bannerId,
                }
                await tenantController.update(formattedData, id)
                if (currentLogoId && currentLogoId !== logoId) deleteImage(currentLogoId)
                if (currentBannerId && currentBannerId !== bannerId) deleteImage(currentBannerId)

                enqueueSnackbar('Empresa editada com sucesso', { variant: 'success' })
                router.push('/empresas')
            } catch (error) {
                enqueueSnackbar('Erro ao editar empresa', { variant: 'error' })
            }
        } catch (error) {
            enqueueSnackbar('Erro ao carregar imagens', { variant: 'error' })
        }
        setLoading(false)
    }

    const onSubmit = async data => {
        if (data.id) {
            editTenant(data, data.id)
        } else {
            createTenant(data)
            console.log(data)
        }
    }

    const TenantFormSchema: ApolloFormSchemaItem[] = [
        {
            name: 'id',
            required: false,
            label: 'id',
            ui: { grid: 12 },
            componenttype: ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'description',
            required: true,
            label: 'Nome',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 12 },
        },
        
        
        {
            name: 'title_banner',
            required: true,
            label: 'Razão Social',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 12 },
        },
        {
            name: 'identity',
            required: true,
            label: 'CNPJ',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 6 },
        },
        {
            name: 'status',
            required: true,
            label: 'Status',
            componenttype: ApolloFormSchemaComponentType.SELECT,
            ui: { grid: 6 },
            options: [
                { label: 'Ativa', value: 'true' },
                { label: 'Inativa', value: 'false' },
            ],
        },
        {
            name: 'linkcondutecode',
            required: true,
            label: 'Link para o código de conduta',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 12 },
        },
       
        {
            name: 'subtitle_banner',
            required: true,
            label: 'Descrição',
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
            ui: { grid: 20 },
        },
       
        {
            name: 'logo',
            label: 'Logo',
            ui: { grid: 6 },
            required: true,
            renderComponent(params) {
                return (
                    <Grid item>
                        <Grid item xs={12}>
                            <InputLabel>Selecione um arquivo para a logo *</InputLabel>
                        </Grid>
                        <TextField
                            type="file"
                            onChange={e => {
                                const target = e.target as HTMLInputElement
                                const files = target.files as FileList
                                setLogoFile(files[0])
                            }}
                        />
                    </Grid>
                )
            },
        },
        {
            name: 'banner',
            label: 'Banner',
            ui: { grid: 6 },
            required: true,
            renderComponent(params) {
                return (
                    <Grid item>
                        <Grid item xs={12}>
                            <InputLabel>Selecione um arquivo para o banner *</InputLabel>
                        </Grid>
                        <TextField
                            type="file"
                            onChange={e => {
                                const target = e.target as HTMLInputElement
                                const files = target.files as FileList
                                setBannerFile(files[0])
                            }}
                        />
                    </Grid>
                )
            },
        },
    ]

    return (
        <>
            {loading && <LoadingScreen />}
            <ApolloForm
                schema={TenantFormSchema}
                initialValues={values}
                onSubmit={onSubmit}
                showCancelButtom={true}
                onCancel={() => setOpenModal(false)}
                submitButtonText="Cadastrar"
                defaultExpandedGroup={true}
                isEdit
                customValues={customValues}
            />
        </>
    )
}

export default NewEditForm
