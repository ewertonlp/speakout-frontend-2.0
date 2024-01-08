import { Button, Card, Grid } from '@mui/material'
import { PostController } from 'controllers/postController'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

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

function ReportDetails({ post, setPost }: { post: IPostListing; setPost: (value: IPostListing) => void }) {
    const formattedDate = moment(post.response['data-ocorrencia']).format('DD/MM/YYYY')
    const formattedCreatedAt = moment(post.createdAt).format('DD/MM/YYYY HH:mm')

    const { query } = useRouter()

    const { enqueueSnackbar } = useSnackbar()

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
        const dataCriacao = moment(formattedCreatedAt, 'DD/MM/YYYY HH:mm');
        const diasEmAberto = dataAtual.diff(dataCriacao, 'days');
        return diasEmAberto;
    }
    
    const diasEmAberto = getDiasEmAberto(formattedCreatedAt).toString();
    const diasEmAbertoNumero = parseInt(diasEmAberto, 10); // Converte a string para um número

    return (
        <Grid display="flex" justifyContent="space-between" container>
            <Grid xs={12} lg={3.8} item paddingBottom="20px">
                <Card sx={{ padding: '25px' }}>
                    <Grid display="flex" flexDirection="column" rowGap="20px">
                        <CardItem title="Protocolo" value={post.protocol} />
                        {/* <Grid display="flex" flexDirection="column" rowGap="5px" marginY="12px">
                            <GrayTypography>Relatos vinculados</GrayTypography>
                            <Button variant="outlined" color="secondary" sx={{ width: '90px' }}>
                                Selecionar
                            </Button>
                        </Grid> */}
                        <CardItem title="Data de criação" value={formattedCreatedAt} />
                        <CardItem title="Dias em aberto" value={diasEmAberto} />
                        <EditableCardItem
                            title="Status"
                            value={post.status}
                            selectOptions={statusOptions}
                            handleSave={handleEditStatus}
                        />
                        <CardItem title="Tipo" value={post.response['tipo-denuncia'].label} />
                        <EditableCardItem
                            title="Sensibilidade"
                            value={post.sensibilidade}
                            filled
                            selectOptions={sensivityOptions}
                            handleSave={handleEditSesivity}
                        />
                        <Grid display="flex" flexDirection="column" rowGap="5px" marginY="12px">
                            <GrayTypography>Canal de origem</GrayTypography>
                            <Button variant="outlined" color="secondary" sx={{ width: '50px' }}>
                                Web
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12} lg={8} display="flex" flexDirection="column" rowGap="20px">
                <Card sx={{ padding: '25px' }}>
                    <TitleTypography>Manifestante</TitleTypography>
                    <Grid
                        marginTop="20px"
                        display="flex"
                        flexDirection="row"
                        columnGap="30px"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <ColumnGrid>
                            <CardItem title="Nome" value={post.response.nome} />
                            <CardItem title="Cargo" value={post.response.cargo} />
                            {/* <CardItem title="Visualizações de status" value="3" /> */}
                            <CardItem title="Horário para contato" value={post.response['horario-contato']} />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Organização" value={post.response.empresa} />
                            <CardItem title="Área de atuação" value={post.response['area-atuacao']} />
                            <CardItem title="Telefone" value="3134479890" />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Relação com a empresa" value={post.response.relacao} />
                            <CardItem title="Email" value={post.response.email} />
                            {/* <CardItem title="Data da última visualização" value="5 de março" /> */}
                        </ColumnGrid>
                    </Grid>
                </Card>
                <Card sx={{ padding: '25px' }}>
                    <TitleTypography>Denunciados</TitleTypography>
                    <Grid
                        marginTop="20px"
                        display="flex"
                        flexDirection="row"
                        columnGap="30px"
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
                <Card sx={{ padding: '25px' }}>
                    <TitleTypography>Evento</TitleTypography>
                    <Grid
                        marginTop="20px"
                        display="flex"
                        flexDirection="row"
                        columnGap="30px"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <ColumnGrid>
                            <CardItem title="Tipo" value={post.response['tipo-denuncia'].label} />
                            <CardItem title="Infração do código de ética" value={post.response.infracao} />
                            <CardItem title="Grau de certeza" value={post.response['grau-de-certeza-denuncia']} />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Data do incidente" value={formattedDate} />
                            <CardItem title="Continua ocorrendo" value={post.response['recorrencia-ocorrencia']} />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Localidade" value={post.response['local-ocorrencia']} />
                            <CardItem
                                title="Nome das testemunhas"
                                value={post.response['sim-testemunhas-ocorrencia']}
                            />
                            <CardItem
                                title="Descrição da ocorrência"
                                value={post.response['nao-testemunhas-ocorrencia']}
                            />
                        </ColumnGrid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ReportDetails
