// next
import Head from 'next/head'
// @mui
import { Container, Grid, Typography } from '@mui/material'
// layouts
// components
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useTheme } from '@mui/material/styles'
import { PostController } from 'controllers/postController'
import { UploadController } from 'controllers/uploadController'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ActionsPage from 'src/components/ActionsPage'
import { ConclusionPage } from 'src/components/ConclusionPage'
import ReportDetails from 'src/components/ReportDetails'
import ReportHistory from 'src/components/ReportHistory'
import ReportMenu from 'src/components/ReportMenu'
import { UserList } from 'src/components/UserList/UserList'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import styled from 'styled-components'
import { IDashUser } from 'types/IDashUser'
import { IImageUpload } from 'types/IImageUpload'
import { IPostHistory } from 'types/IPostHistory'
import { IPostListing } from 'types/IPostListing'

// ----------------------------------------------------------------------

Detalhes.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Detalhes(uploadedFiles: IImageUpload[]) {
    const { themeStretch } = useSettingsContext()
    const { query, back } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const theme = useTheme()
    const titleColor = theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.secondary
    const [selectedUsers, setSelectedUsers] = useState<IDashUser[]>([])
    const [page, setPage] = useState<'relato' | 'historico' | 'usuarios' | 'conclusao' | 'acoes'>('relato')
    const [fileUploaded, setFileUploaded] = useState(false)

    const [post, setPost] = useState<IPostListing>()

    const [histories, setHistories] = useState<IPostHistory[]>([])

    const uploadController = new UploadController()
    const [files, setFiles] = useState<IImageUpload[]>([])

    const getPost = async id => {
        setLoading(true)
        const postController = new PostController()
        try {
            const postData = await postController.getById(id)
            setPost(postData.data)
            if (postData.data.media) {
                console.log('Arquivos de mídia:', postData.data.media)
            } else {
                console.log('Sem arquivos de mídia.')
            }
            setFiles(postData.data.media)
            setHistories(postData.data.posthistories)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (query.id && Number(query.id)) {
            getPost(query.id)
        }
    }, [query.id, fileUploaded])

    if (loading) return <LoadingScreen />

    return (
        <>
            {post && (
                <>
                    <Head>
                        <title>Detalhes do relato</title>
                    </Head>
                    <Grid display="flex" my={3} mx={2} alignItems="center">
                        <BackButtonWrapper onClick={() => back()}>
                            <ArrowBackIosNewOutlinedIcon
                                sx={{
                                    fontSize: '30px',
                                    color: '#727272',
                                    '&:hover': {
                                        color: '#7EB353',
                                        transition: 'color 0.3s',
                                    },
                                }}
                            />
                        </BackButtonWrapper>
                        <Typography
                            className="button-icon"
                            sx={{
                                marginLeft: '10px',
                            }}
                            variant="h5"
                        >
                            {post.protocol} {post.status}
                        </Typography>
                    </Grid>
                    <Container maxWidth={themeStretch ? false : 'xl'}>
                        <ReportMenu page={page} setPage={setPage} />

                        {page === 'relato' ? (
                            <ReportDetails post={post} setPost={setPost} uploadedFiles={uploadedFiles} />
                        ) : page === 'historico' ? (
                            <ReportHistory histories={histories} getPost={getPost} />
                        ) : page === 'usuarios' ? (
                            <UserList
                                postId={post.id}
                                selectedUsers={selectedUsers}
                                setSelectedUsers={setSelectedUsers}
                            />
                        ) : page === 'acoes' ? (
                            <ActionsPage post={post} getPost={getPost} />
                        ) : (
                            <ConclusionPage
                                histories={histories}
                                postId={post.id}
                                tenantId={post.tenant.id}
                                emailDenunciante={post.users}
                            />
                        )}
                    </Container>
                </>
            )}
        </>
    )
}

const BackButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`
