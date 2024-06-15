import { AttachFile, CheckCircle, GetApp } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'
import ComplaintController from 'controllers/complaintController'
import { PostController } from 'controllers/postController'
import { UploadController } from 'controllers/uploadController'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { checkPermission } from 'src/utils/functions'
import { IImageUpload } from 'types/IImageUpload'
import { IPostClosed } from 'types/IPostClosed'
import ComplaintHistoryCard from '../ouvidoria/ComplaintHistoryCard'
import ReportJsPDF from '../ReportPDF/ReportjsPDF'
import { useSnackbar } from 'notistack'
import DeleteIcon from '@mui/icons-material/Delete'

const StyledCard = styled(Card)({
    margin: '2rem auto',
    padding: '1rem',
})

const FileList = styled(List)({
    width: '100%',
    backgroundColor: 'background.default',
})

const FileIcon = styled(AttachFile)({
    fontSize: '2rem',
})

const CenteredBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

const ButtonDownloadPDF = styled(Button)({
    marginTop: '1rem',
})

export const ConclusionPage = ({ histories, tenantId, postId, emailDenunciante }) => {
    const [currentUser] = useState(
        histories && histories[0] && histories[0].user ? histories[0].user : { fullname: 'Nome de usuário' },
    )
    const [messages, setMessages] = useState<{ id: string; createdAt: string; user: { fullname: string }; comment: string }[]>([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loadingComments, setLoadingComments] = useState(false)
    const [isReportGenerated, setIsReportGenerated] = useState(false)
    const [isReportFinalized, setIsReportFinalized] = useState(false)
    const [reportUrl, setReportUrl] = useState<string | null>(null)
    const [downloadingFile, setDownloadingFile] = useState<string | null>(null)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteCommentId, setDeleteCommentId] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const theme = useTheme()

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    const [files, setFiles] = useState<IImageUpload[]>([])
    const [filesUploaded, setFilesUploaded] = useState([])

    const { query } = useRouter()

    const { user } = useAuthContext()

    const { enqueueSnackbar } = useSnackbar()

    const postController = new PostController()
    const uploadController = new UploadController()

    const fetchPostClosedFiles = async () => {
        const postClosed = await postController.getPostClosedByPostId(postId)
        const postClosedArray = Array.isArray(postClosed) ? postClosed : [postClosed]

        const allFilesPromises = postClosedArray.map(postClosed => {
            if (postClosed && postClosed.media) {
                return Promise.all(postClosed.media.map(mediaItem => uploadController.getById(mediaItem.id)))
            }
            return Promise.resolve<IImageUpload[]>([])
        })

        const allFilesArrays = await Promise.all(allFilesPromises)

        const allFiles = ([] as IImageUpload[]).concat(...allFilesArrays)

        setFiles(allFiles)
    }

    const fetchPostClosedComments = async () => {
        setLoadingComments(true) 

        try {
            const postClosed = await postController.getPostClosedByPostId(postId)
            if (postClosed) {
                const postClosedArray = Array.isArray(postClosed) ? postClosed : [postClosed]
                setMessages(
                    postClosedArray.map(comment => ({
                        id: comment.id,
                        createdAt: comment.createdAt,
                        user: { fullname: currentUser.fullname },
                        comment: comment.comment,
                    })),
                )

                if (postClosedArray[0]) {
                    setIsReportFinalized(!!postClosedArray[0].date_close)

                    if (postClosedArray[0].date_close) {
                        const reportData = await postController.getById(query.id as string)
                        await generatePDF(reportData)
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao buscar os comentários:', error)
        }

        setLoadingComments(false)
    }

    const fetchAndStoreFiles = async () => {
        await fetchPostClosedFiles();
    };

    useEffect(() => {
        fetchPostClosedFiles()
        fetchPostClosedComments()
        fetchAndStoreFiles()
        setTimeout(() => {
            setLoadingComments(false)
        }, 2000)
    }, [postId])

    const downloadFile = async (file: IImageUpload) => {
        setDownloadingFile(file.id)

        const link = document.createElement('a')
        link.href = file.url
        if (
            file.name.endsWith('.png') ||
            file.name.endsWith('.jpeg') ||
            file.name.endsWith('svg') ||
            file.name.endsWith('.pdf') ||
            file.name.endsWith('.jpg')
        ) {
            link.target = '_blank'
        } else {
            link.download = file.name
        }
        link.click()
        setDownloadingFile(null)
    }


    async function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setSelectedFile(file);
            const newUploadedFiles = [...uploadedFiles];
            newUploadedFiles.push(file.name)
            setUploadedFiles(newUploadedFiles);
        }
    }

   
    const handleFinalizeReport = async () => {
        setIsLoading(true)

        if (message.trim() == '') return

        const newMessage  = {
            id: '', // Atribui um ID único incremental
            createdAt: new Date().toISOString(),
            user: { fullname: currentUser.fullname },
            comment: message,
        }

        const createPostClosed = async (mediaId?: string) => {
            const postData: IPostClosed = {
                comment: newMessage.comment,
                user: currentUser.id,
                date_close: new Date().toISOString(),
                media: mediaId ? [mediaId] : [],
                post: postId,
                tenant: tenantId,
                emailDenunciante: emailDenunciante[0]?.email,
            }

            try {
                await postController.createPostClosed(postData)
                const reportData = await postController.getById(query.id as string)
                setMessages(prevMessages => [...prevMessages, newMessage])
                setMessage('')
                await generatePDF(reportData)
            } catch (error) {
                console.error('Erro ao finalizar relato:', error)
            }

            setIsLoading(false)
            setIsReportGenerated(true)
            setIsReportFinalized(true)
            fetchPostClosedFiles()
        }

        if (selectedFile) {
            setIsUploading(true)
            const complaintController = new ComplaintController()
            try {
                const uploadResponse = await complaintController.uploadFile(selectedFile)
                const mediaId = uploadResponse[0].id
                setSelectedFile(null)
                createPostClosed(mediaId)
            } catch (error) {
                console.error('Erro ao fazer upload do arquivo:', error);
            }
            setIsUploading(false)
        } else {
            createPostClosed()
        }
    }

    const generatePDF = async reportData => {
        try {
            const pdfBlob = await ReportJsPDF(reportData)
            handlePDFCreation(pdfBlob)
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error)
        }
    }

    const handlePDFCreation = pdfBlob => {
        if (!pdfBlob) {
            console.error('O objeto PDF ou sua propriedade "output" está indefinido.')
            return
        }

        try {
            const url = URL.createObjectURL(pdfBlob)
            setReportUrl(url)
        } catch (error) {
            console.error('Erro ao criar URL do PDF:', error)
        }
    }

    const handleDeleteComment = async () => {
        setIsLoading(true)
        try {
            await postController.deletePostClosedByCommentId(deleteCommentId)
            const updatedMessages = messages.filter(message => message.id !== deleteCommentId)
            setMessages(updatedMessages)
            enqueueSnackbar('Comentário excluído com sucesso', { variant: 'success', autoHideDuration: 3000 })
        } catch (error) {
            enqueueSnackbar('Erro ao excluir comentário', { variant: 'error', autoHideDuration: 3000 })
        } finally {
            setIsLoading(false)
            setDeleteModalOpen(false)
        }
    }

    const handleDeleteConfirmation = id => {
        setDeleteCommentId(id)
        setDeleteModalOpen(true)
    }

    return (
        <>
            <StyledCard>
                <CardContent>
                    <Grid container display="flex" justifyContent="center" gap={5} spacing={3} mb="4rem">
                        <Grid
                            item
                            xs={7}
                            sx={{
                                backgroundColor: 'card.default',
                                borderRadius: '10px',
                                border: `1px solid ${borderColor}`,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: '0 1rem 0 1rem',
                                transition: 'all 0.2s ease-out',
                                '&:hover': {
                                    boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
                                },
                            }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                sx={{ padding: '1rem 0.5rem 2rem' }}
                            >
                                <Typography variant="h5">Comentários</Typography>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    gap={2}
                                >
                                    {checkPermission(user?.role) && (
                                        <>
                                            <label htmlFor="raised-button-file">
                                                <Button variant="outlined" component="span">
                                                    <AttachFile /> Anexar Arquivo
                                                </Button>
                                            </label>
                                            <input
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                type="file"
                                                onChange={handleFileSelection}
                                            />
                                        </>
                                    )}
                                    <span style={{ fontSize: '0.8rem'}}>Máximo de 5MB por arquivo.</span>
                                    {selectedFile && <Typography variant="body1">{selectedFile.name}</Typography>}
                                </Box>
                            </Box>

                            <Grid item xs={12}>
                                <TextField
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Todas as observações de conclusão do Relato devem ser inseridas neste campo."
                                    multiline
                                    rows={4}
                                    fullWidth
                                    sx={{
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: '6px',
                                        backgroundColor: 'background.default',
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} paddingY="2rem">
                                <LoadingButton
                                    loading={isLoading}
                                    loadingPosition="start"
                                    startIcon={<CheckCircle />}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleFinalizeReport}
                                    fullWidth
                                    disabled={message.trim() === ''}
                                >
                                    Finalizar Relato
                                </LoadingButton>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{
                                    borderTop: `1px solid ${borderColor}`,
                                    mt: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    padding: '1rem 0.5rem 2rem',
                                }}
                            >
                                <Typography variant="h5" mt="1rem">
                                    Histórico de comentários
                                </Typography>
                                <Grid item xs={12} px="1rem" mt="1rem">
                                    {loadingComments ? (
                                        <CenteredBox>
                                            <Typography sx={{ marginY: '1rem', marginRight: '1rem' }} variant="body1">
                                                Carregando comentários...
                                            </Typography>
                                            <CircularProgress size={32} color="primary" />
                                        </CenteredBox>
                                    ) : (
                                        messages.map((message, index) => (
                                            <Box
                                                key={index}
                                                marginBottom={3}
                                                display="flex"
                                                alignItems="end"
                                                justifyContent="space-between"
                                                width="100%"
                                            >
                                                <Box flexGrow={1} flexBasis="auto">
                                                    <ComplaintHistoryCard
                                                        date={message.createdAt}
                                                        name={message.user ? message.user.fullname : 'Desconhecido'}
                                                        comment={message.comment}
                                                        lightShadow
                                                        biggerPadding
                                                    />
                                                </Box>

                                                <Tooltip title="Excluir comentário">
                                                    <IconButton
                                                        aria-label="delete comment"
                                                        onClick={() => handleDeleteConfirmation(message.id)}
                                                        sx={{
                                                            '&:hover': {
                                                                color: '#FF5630',
                                                                background: 'transparent',
                                                            },
                                                        }}
                                                    >
                                                        {checkPermission(user?.role) && <DeleteIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        ))
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={4}
                            sx={{
                                backgroundColor: 'card.default',
                                borderRadius: '10px',
                                border: `1px solid ${borderColor}`,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                padding: '0 1rem 0 1rem',
                                transition: 'all 0.2s ease-out',
                                '&:hover': {
                                    boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
                                },
                            }}
                        >
                            <Grid>
                                {files.length > 0 && (
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            backgroundColor: 'card.default',
                                            borderBottom: `1px solid ${borderColor}`,
                                            padding: '1rem 1rem 2rem',
                                        }}
                                    >
                                        <Typography sx={{ marginY: '10px' }} variant="h6">
                                            Arquivos anexados
                                        </Typography>
                                        <FileList>
                                            {files.map(file => (
                                                <Fragment key={file.id}>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <FileIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={file.name} />
                                                        <IconButton
                                                            onClick={() => downloadFile(file)}
                                                            color="primary"
                                                            aria-label="download file"
                                                        >
                                                            <GetApp />
                                                        </IconButton>
                                                    </ListItem>
                                                    <Divider />
                                                </Fragment>
                                            ))}
                                        </FileList>
                                    </Grid>
                                )}
                            </Grid>
                            <Grid>
                                {isReportFinalized && reportUrl && (
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            backgroundColor: 'card.default',
                                            borderBottom: `1px solid ${borderColor}`,
                                            padding: '0 0 0 1rem',
                                        }}
                                    >
                                        <Typography sx={{ marginTop: '2.5rem', marginBottom: '1rem' }} variant="h6">
                                            Relato concluído
                                        </Typography>
                                        <ButtonDownloadPDF
                                            variant="contained"
                                            color="primary"
                                            className=""
                                            sx={{
                                                width: '100%',
                                                paddingY: '0.5rem',
                                                textAlign: 'center',
                                                marginBottom: '1rem',
                                                position: 'relative',
                                            }}
                                            onClick={() => {
                                                const link = document.createElement('a')
                                                link.href = reportUrl
                                                link.download = 'relato.pdf'
                                                link.click()
                                                enqueueSnackbar('Download concluído, verifique sua pasta Downloads', {
                                                    variant: 'success',
                                                    autoHideDuration: 3000,
                                                })
                                            }}
                                        >
                                            Download do relatório
                                        </ButtonDownloadPDF>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </StyledCard>
            <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DialogTitle textAlign={'center'}>Confirmar Exclusão</DialogTitle>
                <DialogContent>Tem certeza que deseja excluir o comentário?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModalOpen(false)} size="large">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteComment} color="error" size="large">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
