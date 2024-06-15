import { AttachFile, GetApp } from '@mui/icons-material'
import { Button, Card, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'
import { PostController } from 'controllers/postController'
import { UploadController } from 'controllers/uploadController'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { Fragment, useEffect, useState } from 'react'
import { IImageUpload } from 'types/IImageUpload'
import { IPostListing } from 'types/IPostListing'
import { ISelectOption } from 'types/ISelectOption'
import { CardItem, ColumnGrid, EditableCardItem, GrayTypography, TitleTypography } from '../CustomMuiComponents'

const FileIcon = styled(AttachFile)({
    fontSize: '2rem',
})

const FileList = styled(List)({
    width: '100%',
    backgroundColor: 'background.default',
})

const sensivityOptions: ISelectOption[] = [
    { label: 'Alta', value: 'alta' },
    { label: 'Média', value: 'media' },
    { label: 'Baixa', value: 'baixa' },
]

const statusOptions: ISelectOption[] = [
    { value: 'em_progresso', label: 'Em progresso' },
    { value: 'novo', label: 'Novo' },
    { value: 'cancelado', label: 'Cancelado' },
    { value: 'concluido_procedente', label: 'Concluido Procedente' },
    { value: 'concluido_improcedente', label: 'Concluido Improcedente' },
]

export function getEmailDenunciante(post: IPostListing): string {
    return post.response.email
}

function ReportDetails({ post, setPost }: { post: IPostListing; setPost: (value: IPostListing) => void; uploadedFiles: IImageUpload[] }) {
    const formattedDate = moment(post.response['data-ocorrencia']).format('DD/MM/YYYY')
    const formattedCreatedAt = moment(post.createdAt).format('DD/MM/YYYY HH:mm')
    const { query } = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const theme = useTheme()
    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'
    const titleColor = theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black

    const [files, setFiles] = useState<IImageUpload[]>([])
    const [downloadingFile, setDownloadingFile] = useState<string | null>(null)
    const uploadController = new UploadController()


    async function handleEditStatus(newStatus: string, handleCloseEditMode: () => void) {
        const postController = new PostController()
        const editedPost = {
            ...post,
            status: newStatus,
        }
        try {
            await postController.update(editedPost, query.id as string)
            setPost(editedPost)
            handleCloseEditMode()
        } catch (error) {
            enqueueSnackbar('Falha ao editar status!', {
                variant: 'error',
            })
        }
    }

    async function handleEditSesivity(newSensibilidade: string, handleCloseEditMode: () => void) {
        const postController = new PostController()
        const editedPost = {
            ...post,
            sensibilidade: newSensibilidade,
        }
        try {
            await postController.update(editedPost, query.id as string)
            setPost(editedPost)
            handleCloseEditMode()
        } catch (error) {
            enqueueSnackbar('Falha ao editar sensibilidade!', {
                variant: 'error',
            })
        }
    }

    const getDiasEmAberto = (formattedCreatedAt: string) => {
        const dataAtual = moment()
        const dataCriacao = moment(formattedCreatedAt, 'DD/MM/YYYY HH:mm')
        const diasEmAberto = dataAtual.diff(dataCriacao, 'days')
        return diasEmAberto
    }

    const diasEmAberto = getDiasEmAberto(formattedCreatedAt).toString()
    const diasEmAbertoNumero = parseInt(diasEmAberto, 10)

    const fetchUploadedFiles = async (id) => {
        const postController = new PostController()
        // const postFiles = await postController.getById(post.id)
        const uploadedfiles = await uploadController.getById(id)
        // console.log(uploadedfiles)
        // console.log(postFiles)
        // const uploadPostFiles = Array.isArray(postFiles) ? postFiles : [postFiles]

        // const uploadedFiles = uploadPostFiles.map(postUploadedFile => {
        //     if (postUploadedFile && postUploadedFile.media) {
        //         return Promise.all(postUploadedFile.media.map(mediaItem => uploadController.getById(mediaItem.id)))
        //     }
        //     return Promise.resolve<IImageUpload[]>([])
        // })

        // console.log(uploadedFiles)

        // const AllFilesArray = await Promise.all(uploadedFiles)

        // const allFiles = ([] as IImageUpload[]).concat(...AllFilesArray)

        // setFiles(allFiles)
    }

    const downloadFile = (file: IImageUpload) => {
        const handleClick = () => {
            setDownloadingFile(file.id);
            const link = document.createElement('a');
            link.href = file.url;
            if (
                file.name.endsWith('.png') ||
                file.name.endsWith('.jpeg') ||
                file.name.endsWith('svg') ||
                file.name.endsWith('.pdf') ||
                file.name.endsWith('.jpg')
            ) {
                link.target = '_blank';
            } else {
                link.download = file.name;
            }
            link.click();
            setDownloadingFile(null);
        };
    
        return (
            <button onClick={handleClick}>
                Baixar {file.name}
            </button>
        );
    };
    

    useEffect(() => {
        // fetchUploadedFiles()
    }, [])

    return (
        <>
            <Grid display="flex" justifyContent="center" gap={5} container mt="4rem">
                <Grid xs={6} lg={5} item paddingBottom="20px">
                    <Card
                        sx={{
                            padding: '25px',
                            backgroundColor: 'card.default',
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                            '&:hover': {
                                boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
                            },
                        }}
                    >
                        <Grid display="flex" flexDirection="column">
                            <TitleTypography>Detalhes</TitleTypography>
                            <Grid item sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                <CardItem title="Protocolo" value={post.protocol} />
                                {/* <Grid display="flex" flexDirection="column" rowGap="5px" marginY="12px">
                            <GrayTypography>Relatos vinculados</GrayTypography>
                            <Button variant="outlined" color="secondary" sx={{ width: '90px' }}>
                                Selecionar
                            </Button>
                        </Grid> */}
                                <CardItem title="Data de criação" value={formattedCreatedAt} />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                <CardItem title="Dias em aberto" value={diasEmAberto} />
                                <EditableCardItem
                                    title="Status"
                                    value={post.status}
                                    selectOptions={statusOptions}
                                    handleSave={handleEditStatus}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                <CardItem title="Tipo" value={post.response['tipo-denuncia'].label} />
                                <EditableCardItem
                                    title="Sensibilidade"
                                    value={post.sensibilidade}
                                    filled
                                    selectOptions={sensivityOptions}
                                    handleSave={handleEditSesivity}
                                />
                            </Grid>
                            <Grid display="flex" flexDirection="column" rowGap="20px" marginY="12px">
                                <GrayTypography>Canal de origem</GrayTypography>
                                <Button variant="outlined" sx={{ width: '80px', color: 'text.primary' }}>
                                    Web
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={6} lg={6} display="flex" flexDirection="column" rowGap="20px">
                    <Card
                        sx={{
                            padding: '25px',
                            backgroundColor: 'card.default',
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                            '&:hover': {
                                boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
                            },
                        }}
                    >
                        <TitleTypography>Manifestante</TitleTypography>
                        <Grid
                            marginTop="20px"
                            display="flex"
                            flexDirection="row"
                            columnGap="30px"
                            justifyContent="space-between"
                            flexWrap="wrap"
                        >
                            <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                <CardItem title="Nome" value={post.response.nome} />
                                <CardItem title="Cargo" value={post.response.cargo} />
                                {/* <CardItem title="Visualizações de status" value="3" /> */}
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                <CardItem title="Horário para contato" value={post.response['horario-contato']} />
                                <CardItem title="Organização" value={post.response.empresa} />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                <CardItem title="Área de atuação" value={post.response['area-atuacao']} />
                                <CardItem title="Telefone" value="3134479890" />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                <CardItem title="Relação com a empresa" value={post.response.relacao} />
                                <CardItem title="Email" value={post.response.email} />
                                {/* <CardItem title="Data da última visualização" value="5 de março" /> */}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid display="flex" justifyContent="center" gap={5} container>
                    <Grid item xs={6} lg={5} display="flex" flexDirection="column" rowGap="20px">
                        <Card
                            sx={{
                                padding: '25px',
                                backgroundColor: 'card.default',
                                borderRadius: '10px',
                                border: `1px solid ${borderColor}`,
                                '&:hover': {
                                    boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
                                },
                            }}
                        >
                            <TitleTypography>Denunciados</TitleTypography>
                            <Grid
                                marginTop="20px"
                                display="flex"
                                flexDirection="column"
                                gap="2rem"
                                justifyContent="space-between"
                                flexWrap="wrap"
                            >
                                <ColumnGrid>
                                    <CardItem title="Nome do denunciado" value={post.response['autor-ocorrencia']} />
                                </ColumnGrid>
                                <ColumnGrid>
                                    <CardItem title="Membros do comitê denunciados" value="" />
                                </ColumnGrid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={6} lg={6} display="flex" flexDirection="column" rowGap="20px">
                        <Card
                            sx={{
                                padding: '25px',
                                backgroundColor: 'card.default',
                                borderRadius: '10px',
                                border: `1px solid ${borderColor}`,
                                '&:hover': {
                                    boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.16)',
                                },
                            }}
                        >
                            <TitleTypography>Evento</TitleTypography>
                            <Grid
                                marginTop="20px"
                                display="flex"
                                flexDirection="row"
                                columnGap="30px"
                                justifyContent="space-between"
                                flexWrap="wrap"
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}
                                >
                                    <CardItem title="Tipo" value={post.response['tipo-denuncia'].label} />
                                    <CardItem title="Infração do código de ética" value={post.response.infracao} />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}
                                >
                                    <CardItem
                                        title="Grau de certeza"
                                        value={post.response['grau-de-certeza-denuncia']}
                                    />
                                    <CardItem title="Data do incidente" value={formattedDate} />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}
                                >
                                    <CardItem
                                        title="Continua ocorrendo"
                                        value={post.response['recorrencia-ocorrencia']}
                                    />

                                    <CardItem title="Localidade" value={post.response['local-ocorrencia']} />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}
                                >
                                    <CardItem
                                        title="Nome das testemunhas"
                                        value={post.response['sim-testemunhas-ocorrencia']}
                                    />
                                    <CardItem
                                        title="Descrição da ocorrência"
                                        value={post.response['nao-testemunhas-ocorrencia']}
                                    />
                                    <CardItem
                                        title="Descrição da ocorrência"
                                        value={post.response['nao-testemunhas-ocorrencia']}
                                    />

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

                                    {/* {uploadedFiles.length > 0 && (
                                        <Grid>
                                            <Typography sx={{ marginY: '10px' }} variant="h6">
                                                Arquivos anexados
                                            </Typography>
                                            <FileList>
                                                {uploadedFiles.map(file => (
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
                                                    </Fragment>
                                                ))}
                                            </FileList>
                                        </Grid>
                                    )} */}
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ReportDetails
