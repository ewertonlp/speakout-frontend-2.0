// next
import Head from 'next/head'
// @mui
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'

import moment from 'moment'
import { useSnackbar } from 'notistack'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable'
import { IPostListing } from 'types/IPostListing'
import { PostController } from '../../../controllers/postController'

// ----------------------------------------------------------------------

ReportsListing.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function ReportsListing() {
    const router = useRouter()
    const { themeStretch } = useSettingsContext()
    const { enqueueSnackbar } = useSnackbar()
    const [deletePostId, setDeletePostId] = useState('')
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState<IPostListing[]>([])

    const { tenantId } = useAuthContext()

    function convertStatusText(text:string) {
        switch (text) {
            case 'em_progresso':
                return 'Em andamento'
            case 'novo':
                return 'Novo'
            case 'concluido_procedente':
                return 'Concluído Procedente'
            case 'concluido_improcedente':
                return 'Concluído Improcedente'
            case 'cancelado':
                return 'Cancelado'
            default:
                return text
        }
    }

    const getPosts = async () => {
        setLoading(true)
        const postController = new PostController()
        try {
            const postsData = await postController.getAll()

            const filteredPosts = postsData

                .map(item => {
                    const createdAtFormatted = moment(item.createdAt).format('DD/MM/YYYY')
                    const diasEmAberto = getDiasEmAberto(createdAtFormatted)

                    return {
                        ...item,
                        createdAt: createdAtFormatted,
                        company: item.tenant.description,
                        type: item.response['tipo-denuncia'].label,
                        status: convertStatusText(item.status),
                        openDays: diasEmAberto,
                        date_closed:
                            item.postcloseds.length > 0
                                ? moment(item.postcloseds[0].date_close).format('DD/MM/YYYY')
                                : '--',
                        sensibilidadeNum: getSensibilidadeNum(item.sensibilidade),
                    };
                })
                .filter(item => selectedStatus === '' || item.status === selectedStatus)
            setPosts(filteredPosts)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getDiasEmAberto = (createdAt:string) => {
        const dataAtual = moment()
        const dataCriacao = moment(createdAt, 'DD/MM/YYYY')
        const diasEmAberto = dataAtual.diff(dataCriacao, 'days')
        return diasEmAberto
    }

    const getSensibilidadeNum = (sensibilidade:string) => {
        switch (sensibilidade) {
            case 'alta':
                return 3
            case 'media':
                return 2
            case 'baixa':
                return 1
            default:
                return 0
        }
    }

    const handleButtonClick = (status:string) => {
        setSelectedStatus(status)
        getPosts()
    }

    useEffect(() => {
        const fetchData = async () => {
            await getPosts()
        }
        fetchData()
    }, [tenantId, selectedStatus])

    const filterPostsByDate = (posts) => {
        const date = moment()
        const firstDayOfMonth = date.clone().startOf('month')
        const lastDayOfMonth = date.clone().endOf('month')

        return posts.filter(post => {
            const postDate = moment(post.createdAt, 'DD/MM/YYYY')
            return postDate.isSameOrAfter(firstDayOfMonth) && postDate.isSameOrBefore(lastDayOfMonth)
        })
    }

    const handleFilterByDate = () => {
        const filteredPosts = filterPostsByDate(posts)
        setPosts(filteredPosts)
    }

    const handleDeleteConfirmation = id => {
        setDeletePostId(id)
        setDeleteModalOpen(true)
    }

    const handleDeletePost = async () => {
        if (deletePostId) {
            const postController = new PostController()

            try {
                await postController.deletePost(deletePostId)
                const updatePosts = posts.filter(post => post.id !== deletePostId)
                enqueueSnackbar('Relato excluído com sucesso', { variant: 'success' })
                setPosts(updatePosts)
            } catch (error) {
                console.error('Erro ao excluir o post:', error)
                enqueueSnackbar('Erro ao excluir o relato', { variant: 'error' })
            }
            setDeleteModalOpen(false)
            setDeletePostId('')
        }
    }

    return (
        <>
            <Card sx={{ height: '100%', px: '1%', py: '18px' }}>
                <Head>
                    <title>Relatos</title>
                </Head>
                {loading && <LoadingScreen />}
                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <HeaderBreadcrumbs
                                heading={'Relatos'}
                                links={[
                                    {
                                        name: 'Relatos',
                                        href: '/relatos',
                                    },
                                    { name: 'Lista' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ mx: '0.5rem' }} onClick={() => handleButtonClick('')}>
                                Todos
                            </Button>
                            <Button variant="contained" sx={{ mx: '0.5rem' }} onClick={() => handleFilterByDate()}>
                                Abertos no mês
                            </Button>
                            <Button variant="contained" sx={{ mx: '0.5rem' }} onClick={() => handleButtonClick('Novo')}>
                                Novos
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ mx: '0.5rem' }}
                                onClick={() => handleButtonClick('Em andamento')}
                            >
                                Em andamento
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ mx: '0.5rem' }}
                                onClick={() => handleButtonClick('Concluído Procedente')}
                            >
                                Finalizado procedente
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ mx: '0.5rem' }}
                                onClick={() => handleButtonClick('Concluído Improcedente')}
                            >
                                Finalizado improcedente
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ mx: '0.5rem' }}
                                onClick={() => handleButtonClick('Cancelado')}
                            >
                                Cancelados
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            {/* <AccordionFilter
                                schemaForm={BusinessFilterFormSchema}
                                setFilters={handleSetBusinessFilters}
                                formData={businessFilters}
                            /> */}
                        </Grid>

                        <Grid item xs={12}>
                            <CrudTable
                                editPagePath="/detalhes/"
                                tableData={posts || []}
                                setTableData={setPosts}
                                clickableRow
                                onDelete={handleDeleteConfirmation}
                                tableLabels={[
                                    { id: 'email', label: 'Email' },
                                    { id: 'createdAt', label: 'Data Criação' },
                                    { id: 'status', label: 'Status' },
                                    { id: 'type', label: 'Tipo de denúncia' },
                                    { id: 'openDays', label: 'Dias em aberto' },
                                    { id: 'date_closed', label: 'Data Fechamento' },
                                    { id: 'sensibilidade', label: 'Sensibilidade' },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Card>
            <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DialogTitle textAlign={'center'}>Confirmar Exclusão</DialogTitle>
                <DialogContent>Tem certeza que deseja excluir este relato?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModalOpen(false)} size="large">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeletePost} color="error" size="large">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
