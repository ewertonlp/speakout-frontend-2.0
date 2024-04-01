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
import AuthController from 'controllers/authController'
import { PostHistoriesController } from 'controllers/postHistoriesController'
import { UploadController } from 'controllers/uploadController'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import ApolloForm, {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaItem,
} from 'src/components/apollo-form/ApolloForm.component'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { IPostHistoryCreate } from 'types/IPostHistory'

export function NewCommentModal({
    open,
    setOpen,
    getPost,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    getPost: (id: string) => void
}) {
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [fileFieldValue, setFileFieldValue] = useState<File[]>()

    const [initialValue, setInitialValue] = useState([])

    const { query } = useRouter()

    const { tenantId } = useAuthContext()

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

    async function onSubmit(formData: any) {
        setLoading(true)
        const postHistoriesController = new PostHistoriesController()
        const authController = new AuthController()
        const user = authController.getUser()
        if (user) {
            if (fileFieldValue) {
                try {
                    const uploadController = new UploadController()
                    const filesIds = [] as string[]
                    const promises = fileFieldValue.map(async file => {
                        const uploadImageResponse = await uploadController.uploadFile(file)
                        filesIds.push(uploadImageResponse[0].id)
                    })
                    await Promise.all(promises)
                    try {
                        const formattedData: IPostHistoryCreate = {
                            comment: formData.comment,
                            user: String(user.id || ''),
                            media: filesIds,
                            post: query.id as string,
                            tenant: tenantId,
                        }
                        const response = await postHistoriesController.sendNewComment(formattedData)
                        showSnackbarMessage('success', 'Cadastro realizado com sucesso')
                        getPost(query.id as string)
                    } catch (error) {
                        showSnackbarMessage('error', 'Falha ao cadastrar ocorrência')
                    }
                } catch (error) {}
            } else {
                try {
                    const formattedData: IPostHistoryCreate = {
                        comment: formData.comment,
                        user: String(user.id || ''),
                        post: query.id as string,
                        tenant: tenantId,
                    }
                    const response = await postHistoriesController.sendNewComment(formattedData)
                    getPost(query.id as string)
                    showSnackbarMessage('success', 'Cadastro realizado com sucesso')
                } catch (error) {
                    showSnackbarMessage('error', 'Falha ao cadastrar ocorrência')
                }
            }
        }
        setLoading(false)
    }

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'file',
            label: '',
            ui: { grid: 12 },
            required: false,
            renderComponent(params) {
                return (
                    <Grid item>
                        <Grid item xs={12}>
                            <InputLabel sx={{ml: '1rem'}}>Selecione o arquivo</InputLabel>
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
        {
            name: 'comment',
            label: 'Insira seu comentário',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
    ]

    return (
        <>
            {loading && <LoadingScreen />}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign:'center' }} color="text" fontSize='1.5rem' id="scroll-dialog-title">
                    Inserir nova Mensagem
                </DialogTitle>
                <DialogContent sx={{ padding: '15px' }}>
                    <Grid
                        display="flex"
                        flexDirection="column"
                        p={2}
                        item
                        lg={8}
                        xs={12}
                        margin="0 auto"
                        minHeight={'auto'}
                        sx={{ minWidth: { xs: '100%', md: '500px' }, backgroundColor:'card.default' }}
                        
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
