import { Button, Card, Grid } from '@mui/material'
import { PostController } from 'controllers/postController'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useTheme } from '@mui/material/styles';
import { IPostListing } from 'types/IPostListing'
import { ISelectOption } from 'types/ISelectOption'
import { CardItem, ColumnGrid, EditableCardItem, GrayTypography, TitleTypography } from '../CustomMuiComponents'

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

function ReportDetails({ post, setPost }: { post: IPostListing; setPost: (value: IPostListing) => void }) {
    const formattedDate = moment(post.response['data-ocorrencia']).format('DD/MM/YYYY')
    const formattedCreatedAt = moment(post.createdAt).format('DD/MM/YYYY HH:mm')
    const { query } = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const theme = useTheme();
    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'
    const titleColor = theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black;

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

    return (
        <>
            <Grid display="flex" justifyContent="center" gap={5} container mt='4rem'>
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
                            <TitleTypography >Detalhes</TitleTypography>
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
                        <TitleTypography >Manifestante</TitleTypography>
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
                            <TitleTypography >Denunciados</TitleTypography>
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
                                <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                    <CardItem title="Tipo" value={post.response['tipo-denuncia'].label} />
                                    <CardItem title="Infração do código de ética" value={post.response.infracao} />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                    <CardItem
                                        title="Grau de certeza"
                                        value={post.response['grau-de-certeza-denuncia']}
                                    />
                                    <CardItem title="Data do incidente" value={formattedDate} />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
                                    <CardItem
                                        title="Continua ocorrendo"
                                        value={post.response['recorrencia-ocorrencia']}
                                    />

                                    <CardItem title="Localidade" value={post.response['local-ocorrencia']} />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, mb: 2 }}>
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
