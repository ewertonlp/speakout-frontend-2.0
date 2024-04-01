import {
    Alert,
    AlertColor,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    Snackbar,
    TextField,
} from '@mui/material'
import { PostActionController } from 'controllers/postActionController'
import { PostController } from 'controllers/postController'
import { UploadController } from 'controllers/uploadController'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ApolloForm, {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaItem,
} from 'src/components/apollo-form/ApolloForm.component'
import { IDashUserGet } from 'types/IDashUser'
import { IPostAction } from 'types/IPostAction'
import LoadingScreen from '../loading-screen/LoadingScreen'

export function NewActionModal({
    open,
    setOpen,
    getPost,
    users,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    getPost: (id: string) => void
    users: IDashUserGet[]
}) {
    const handleClose = () => setOpen(false)

    const [fileFieldValue, setFileFieldValue] = useState<File[]>()

    const { query } = useRouter()

    const [initialValue, setInitialValue] = useState([])
    const postController = new PostController()

    const userOptions: { label: string; value: string; email: string }[] = []
    users.map(user => userOptions.push({ value: user.id, label: user.fullname, email: user.email }))

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<{ type: AlertColor; text: string }>({
        type: 'error',
        text: '',
    })

    function handleCloseSnackbar() {
        setOpenSnackbar(false)
    }

    function showSnackbarMessage(type: AlertColor, text: string) {
        setOpenSnackbar(true)
        setSnackbarMessage({ type, text })
    }

    const [loading, setLoading] = useState(false)
    const postActionController = new PostActionController()

    const handleSendEmail = async (email: string) => {
        console.log(email)
        try {
            await postActionController.sendMail(email)
        } catch (error) {
            console.error('Erro ao enviar email', error)
        } 
    }

    async function onSubmit(formData: any) {
        setLoading(true)
        const uploadController = new UploadController()
        const email = users[0].email
        if (fileFieldValue) {
            try {
                const filesIds = [] as string[]
                const promises = fileFieldValue.map(async file => {
                    const uploadImageResponse = await uploadController.uploadFile(file)
                    filesIds.push(uploadImageResponse[0].id)
                })
                await Promise.all(promises)
                try {
                    console.log(filesIds)
                    const formattedData: IPostAction = {
                        description: formData.description,
                        user: formData.user,
                        media: filesIds,
                        post: query.id as string,
                        status: 'active',
                        title: formData.title,
                    }
                    getPost(query.id as string)
                    await postActionController.create(formattedData)
                    showSnackbarMessage('success', 'Cadastro realizado com sucesso')
                    handleSendEmail(email)
                } catch (error) {
                    showSnackbarMessage('error', 'Falha ao cadastrar ocorrência')
                }
            } catch (error) {
                showSnackbarMessage('error', 'Falha ao fazer upload de mídia')
            }
        } else {
            try {
                const formattedData: IPostAction = {
                    description: formData.description,
                    user: formData.user,
                    post: query.id as string,
                    status: formData.status,
                    title: formData.title,
                }
                await postActionController.create(formattedData)
                getPost(query.id as string)
                showSnackbarMessage('success', 'Ação cadastrada com sucesso')
                handleSendEmail(email)
            } catch (error) {
                showSnackbarMessage('error', 'Falha ao cadastrar ação')
            }
        }
        setLoading(false)
    }

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'title',
            label: 'Título',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXT,
        },
        {
            name: 'description',
            label: 'Insira a descrição',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
        {
            name: 'user',
            label: 'Selecione o usuário responsável pela ação',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: userOptions,
        },
        {
            name: 'status',
            label: 'Status',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                { value: 'active', label: 'Ativa' },
                { value: 'deactive', label: 'Inativa' },
                { value: 'closed', label: 'Encerrada' },
            ],
        },
        {
            name: 'file',
            label: '',
            ui: { grid: 12 },
            required: false,
            renderComponent(params) {
                return (
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <InputLabel sx={{ml:'1rem'}}>Selecione o arquivo</InputLabel>
                        </Grid>
                        <TextField
                            type="file"
                            inputProps={{
                                multiple: true,
                            }}
                            onChange={e => {
                                const target = e.target as HTMLInputElement
                                const files = target.files as FileList
                                const filesArray: File[] = Array.from(files)
                                setFileFieldValue(filesArray)
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
            <Dialog open={open} onClose={handleClose} sx={{borderRadius:'10px'}}>
                <DialogTitle sx={{ textAlign:'center' }} textTransform='capitalize' color="text" id="scroll-dialog-title">
                    Cadastrar nova ação
                </DialogTitle>
                <DialogContent sx={{ padding: '0' }}>
                    <Grid
                        display="flex"
                        flexDirection="column"
                        p={2}
                        item
                        lg={8}
                        xs={12}
                        margin="0 auto"
                        minHeight={'auto'}
                        sx={{ minWidth: { xs: '100%', md: '500px' } }}
                    >
                        <ApolloForm
                            schema={formSchema}
                            initialValues={initialValue}
                            submitButtonText="Enviar"
                            onSubmit={onSubmit}
                            showCancelButtom
                            onCancel={handleClose}
                            cancelButtonTitle="Fechar"
                            defaultExpandedGroup={true}
                        />
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.type} sx={{ width: '100%' }}>
                                {snackbarMessage.text}
                            </Alert>
                        </Snackbar>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
