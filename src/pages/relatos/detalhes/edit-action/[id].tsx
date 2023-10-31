import {
    Alert,
    AlertColor,
    Button,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material'
import { PostActionController } from 'controllers/postActionController'
import { PostActionDetailsController } from 'controllers/postActionDetailsController'
import { UploadController } from 'controllers/uploadController'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ApolloForm, ApolloFormSchemaItem } from 'src/components'
import BackButton from 'src/components/BackButton'
import CustomCard from 'src/components/CustomCard'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import ActionCommentCard from 'src/components/ouvidoria/ActionCommentCard'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import { IPostActionGet, statusEnum } from 'types/IPostAction'
import { IPostActionDetails } from 'types/IPostActionDetails'

EditAction.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function EditAction() {
    const router = useRouter()

    const { themeStretch } = useSettingsContext()
    const { query } = useRouter()

    const postId = query.post,
        actionId = query.id

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

    const [fileFieldValue, setFileFieldValue] = useState<File[]>()

    const { user } = useAuthContext()

    const [postAction, setPostAction] = useState<IPostActionGet>()

    const handleDelete = (id: string) => {
        if (postAction) {
            const postActionsDetails = postAction.postactionsdetails.filter(details => details.id !== id)
            setPostAction({ ...postAction, postactionsdetails: postActionsDetails })
        }
    }

    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => {
        setOpenModal(false)
    }

    const loadData = async id => {
        setLoading(true)
        try {
            const postActionController = new PostActionController()
            const response = await postActionController.getById(id)
            setPostAction(response)
        } catch (error) {}
        setLoading(false)
    }

    useEffect(() => {
        if (actionId && Number(actionId)) {
            loadData(actionId)
        }
    }, [actionId])

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'title',
            required: true,
            label: 'Título',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 12 },
        },
        {
            name: 'description',
            required: true,
            label: 'Descrição',
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
            ui: { grid: 12 },
        },
        {
            name: 'file',
            label: '',
            ui: { grid: 12 },
            required: false,
            renderComponent(params) {
                return (
                    <Grid item>
                        <Grid item xs={12}>
                            <InputLabel>Selecione os arquivos</InputLabel>
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

    const onSubmit = async formData => {
        const postActionDetailsController = new PostActionDetailsController()
        const uploadController = new UploadController()
        if (user) {
            if (fileFieldValue) {
                try {
                    const filesIds = [] as string[]
                    const promises = fileFieldValue.map(async file => {
                        const uploadImageResponse = await uploadController.uploadFile(file)
                        filesIds.push(uploadImageResponse[0].id)
                    })
                    await Promise.all(promises)
                    try {
                        const formattedData: IPostActionDetails = {
                            description: formData.description,
                            title: formData.title,
                            media: filesIds,
                            postaction: actionId as string,
                            user: user.id,
                        }
                        await postActionDetailsController.create(formattedData)
                        showSnackbarMessage('success', 'Comentário cadastrado com sucesso')
                        loadData(actionId)
                    } catch (error) {
                        showSnackbarMessage('error', 'Falha ao cadastrar comentário')
                    }
                } catch (error) {
                    showSnackbarMessage('error', 'Falha ao fazer upload de mídia')
                }
            } else {
                try {
                    const formattedData: IPostActionDetails = {
                        description: formData.description,
                        title: formData.title,
                        postaction: actionId as string,
                        user: user.id,
                    }
                    await postActionDetailsController.create(formattedData)
                    loadData(actionId)
                    showSnackbarMessage('success', 'Comentário cadastrado com sucesso')
                } catch (error) {
                    showSnackbarMessage('error', 'Falha ao cadastrar comentário')
                }
            }
        }
    }

    return (
        <CustomCard>
            <Head>
                <title>Edição de ação</title>
            </Head>
            {loading && <LoadingScreen />}
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <BackButton />
                <Grid item xs={12}>
                    <HeaderBreadcrumbs heading={'Edição de ação'} links={[{ name: 'Edição' }]} />
                </Grid>
                <Grid display="flex" justifyContent="space-between" mb="20px">
                    <Typography variant="body1">
                        <strong>Status: </strong>
                        {statusEnum[postAction ? postAction.status : 'deactive']}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Usuário responsável: </strong>
                        {postAction?.user ? postAction?.user.fullname : 'Desconhecido'}
                    </Typography>
                </Grid>
                <Grid display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="secondary" onClick={() => setOpenModal(true)}>
                        Novo comentário
                    </Button>
                </Grid>

                <Grid display="flex" rowGap="20px" flexDirection="column" mt="20px">
                    {(postAction?.postactionsdetails &&
                        postAction?.postactionsdetails.length > 0 &&
                        postAction?.postactionsdetails.map((comment, index) => (
                            <ActionCommentCard
                                date={comment.createdAt}
                                description={comment.description}
                                title={comment.title}
                                name={comment.user ? comment.user.fullname : 'Desconhecido'}
                                key={index}
                                handleDelete={() => handleDelete(comment.id)}
                            />
                        ))) || (
                        <Grid height="400px" display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="body1" textAlign={'center'} fontWeight={600}>
                                Ainda não há comentários para exibir
                            </Typography>
                        </Grid>
                    )}
                </Grid>
                <Dialog open={openModal} onClose={handleClose}>
                    <DialogTitle sx={{ padding: '20px 18px 5px 18px' }} color="#727272" id="scroll-dialog-title">
                        Cadastrar novo comentário
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
                                initialValues={{}}
                                onSubmit={onSubmit}
                                submitButtonText="Salvar"
                                onCancel={() => router.back()}
                                showCancelButtom={true}
                                defaultExpandedGroup={true}
                            />
                            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                <Alert
                                    onClose={handleCloseSnackbar}
                                    severity={snackbarMessage.type}
                                    sx={{ width: '100%' }}
                                >
                                    {snackbarMessage.text}
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </Container>
        </CustomCard>
    )
}
