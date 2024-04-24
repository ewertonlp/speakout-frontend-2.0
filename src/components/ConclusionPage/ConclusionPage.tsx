import { AttachFile, CheckCircle, GetApp } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import ReactPDF from '@react-pdf/renderer'
import ComplaintController from 'controllers/complaintController'
import { PostController } from 'controllers/postController'
import { UploadController } from 'controllers/uploadController'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { checkPermission } from 'src/utils/functions'
import { IImageUpload } from 'types/IImageUpload'
import { IPostClosed } from 'types/IPostClosed'
import ReportPDF from '../ReportPDF/ReportPDF'
import ComplaintHistoryCard from '../ouvidoria/ComplaintHistoryCard'
import { useTheme } from '@mui/material/styles'

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
    marginTop: '0.65rem',
})

export const ConclusionPage = ({ histories, tenantId, postId, emailDenunciante }) => {
    const [currentUser] = useState(
        histories && histories[0] && histories[0].user ? histories[0].user : { fullname: 'Nome de usuário' },
    )
    const [messages, setMessages] = useState<{ createdAt: string; user: { fullname: string }; comment: string }[]>([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loadingComments, setLoadingComments] = useState(false)
    const [isReportGenerated, setIsReportGenerated] = useState(false)
    const [isReportFinalized, setIsReportFinalized] = useState(false)
    const [reportUrl, setReportUrl] = useState<string | null>(null)
    const [downloadingFile, setDownloadingFile] = useState<string | null>(null)
    const [fileUploaded, setFileUploaded] = useState(false);

    const theme = useTheme()

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    const [files, setFiles] = useState<IImageUpload[]>([])

    const { query } = useRouter()

    const { user } = useAuthContext()

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

        const postClosed = await postController.getPostClosedByPostId(postId)
        if (postClosed) {
            const postClosedArray = Array.isArray(postClosed) ? postClosed : [postClosed]
            setMessages(
                postClosedArray.map(comment => ({
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
        setLoadingComments(false)
    }

    useEffect(() => {
        fetchPostClosedFiles()
        fetchPostClosedComments()
    }, [postId, fileUploaded])

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

    const generatePDF = async reportData => {
        const blob = await ReactPDF.pdf(<ReportPDF reportData={reportData} />).toBlob()

        const url = URL.createObjectURL(blob)
        setReportUrl(url)
    }

    const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null
        setSelectedFile(file)
        setFileUploaded(true);
    }

    const handleFinalizeReport = async () => {
        setIsLoading(true)

        if (message.trim() == '') return

        const newMessage = {
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
                emailDenunciante: emailDenunciante[0].email,
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
            // fetchPostClosedFiles()
        }

        if (selectedFile) {
            setIsUploading(true)
            const complaintController = new ComplaintController()
            try {
                const uploadResponse = await complaintController.uploadFile(selectedFile)
                const mediaId = uploadResponse[0].id
                setSelectedFile(null)
                createPostClosed(mediaId)
            } catch (error) {}
            setIsUploading(false)
        } else {
            createPostClosed()
        }
    }

    return (
        <>
            <StyledCard>
                <CardContent>
                    <Grid container display="flex" justifyContent="center" gap={5} spacing={3} mb="4rem">
                        <Grid
                            item
                            xs={5}
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
                                alignItems="center"
                                sx={{ padding: '1rem 0.5rem 2rem' }}
                            >
                                <Typography variant="h5">Comentários</Typography>

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
                                {selectedFile && <Typography variant="body1">{selectedFile.name}</Typography>}
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
                                        borderRadius: '8px',
                                        backgroundColor: 'background.default',
                                    }}
                                />
                            </Grid>

                            <Grid item xs={5} paddingX="1rem" paddingY="0.7rem">
                                <LoadingButton
                                    loading={isLoading}
                                    loadingPosition="start"
                                    startIcon={<CheckCircle />}
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleFinalizeReport}
                                    fullWidth
                                    disabled={message.trim() === ''}
                                >
                                    Finalizar Relato
                                </LoadingButton>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={5}
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
                            <Typography variant="h5" mt="1rem">
                                Histórico de comentários
                            </Typography>
                            <Grid item xs={12} px="1rem">
                                {loadingComments ? (
                                    <CenteredBox>
                                        <CircularProgress size={40} color="primary" />
                                    </CenteredBox>
                                ) : (
                                    messages.map((message, index) => (
                                        <Box key={index} marginBottom={3}>
                                            <ComplaintHistoryCard
                                                date={message.createdAt}
                                                name={message.user ? message.user.fullname : 'Desconhecido'}
                                                comment={message.comment}
                                                lightShadow
                                                biggerPadding
                                            />
                                        </Box>
                                    ))
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container display="flex" justifyContent="center" gap={5} spacing={3}>
                        {isReportFinalized && reportUrl && (
                            <Grid
                                item
                                xs={5}
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
                                <Typography sx={{ marginY: '10px' }} variant="h6">
                                    Relato concluído
                                </Typography>
                                <ButtonDownloadPDF
                                    variant="contained"
                                    color="primary"
                                    className=""
                                    sx={{ width: '250px', paddingY: '0.5rem' }}
                                    onClick={() => {
                                        const link = document.createElement('a')
                                        link.href = reportUrl
                                        link.download = 'relato.pdf'
                                        link.click()
                                    }}
                                >
                                    Download do relatório
                                </ButtonDownloadPDF>
                            </Grid>
                        )}

                        {files.length > 0 && (
                            <Grid
                                item
                                xs={5}
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
                </CardContent>
            </StyledCard>
        </>
    )
}
