import { Grid, InputLabel, TextField } from '@mui/material'
import ComplaintController from 'controllers/complaintController'
import TenantController from 'controllers/tenantController'
import { UploadController } from 'controllers/uploadController'
import Cookies from 'js-cookie'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Loading from 'src/components/Loading'
import ApolloForm, {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaGroup,
    ApolloFormSchemaItem,
} from 'src/components/apollo-form/ApolloForm.component'
import AppBar from 'src/components/ouvidoria/AppBar'
import NoCompany from 'src/components/ouvidoria/NoCompany'
import { SuccessMessageModal } from 'src/components/ouvidoria/SuccessMessageModal'
import TermosAceite from 'src/components/ouvidoria/TermoAceite'
import { ICompanyInfo } from 'types/ICompanyInfo'
import { IComplaint } from 'types/IComplaint'

const Form = ({ values }) => {
    const { enqueueSnackbar } = useSnackbar()

    const [fileFieldValue, setFileFieldValue] = useState<File[]>()
    const [infracao, setInfracao] = useState<string>()
    const [naoTestemunhasOcorrencia, setNaoTestemunhasOcorrencia] = useState<string>()

    const [termAccepted, setTermAccepted] = useState(false)

    const router = useRouter()
    const company = router.query.company

    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>()
    const [noCompany, setNoCompany] = useState(false)

    const [loading, setLoading] = useState(true)
    const [initialValues, setInitialValues] = useState<any>([])

    const [checkTestemunhas, setCheckTestemunhas] = useState<string>()
    const [checkIdentification, setCheckIdentification] = useState<string>('')
    const [checkTipoDenuncia, setCheckTipoDenuncia] = useState<string>()
    const [checkRelacao, setCheckRelacao] = useState<string>()

    const [protocol, setProtocol] = useState<string>('')

    const [openSuccesMessageModal, setOpenSuccessMessageModal] = useState<boolean>(false)

    const onSubmit = async data => {
        if (!companyInfo) return
        const complaintController = new ComplaintController()
  
        const formData = {
            ...data,
            'data-ocorrencia': moment(data['data-ocorrencia']).format('YYYY-MM-DD'),
        }
        if (data.identificacao === 'true') {
            const regex = /\(\d\d\)\d\d\d\d\d-\d\d\d\d/i
            if (!regex.test(data.telefone)) {
                enqueueSnackbar('Telefone inválido!', { variant: 'error' })
                return
            }
        }
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
                    const formattedData: IComplaint = {
                        tenant: companyInfo?.id,
                        email: data.email,
                        media: filesIds,
                        response: {
                            ...formData,
                            infracao: infracao,
                            'nao-testemunhas-ocorrencia': naoTestemunhasOcorrencia,
                        },
                    }
                    const response = await complaintController.sendComplaint(formattedData)
                    setProtocol(response.data.protocol)
                    setOpenSuccessMessageModal(true)
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                console.log('Erro ao enviar formulário:', error);
                enqueueSnackbar('Erro ao enviar formulário', { variant: 'error' })
            }
        } else {
            try {
                
                const formattedData: IComplaint = {
                    tenant: companyInfo?.id,
                    email: data.email,
                    response: {
                        ...formData,
                        infracao: infracao,
                        'nao-testemunhas-ocorrencia': naoTestemunhasOcorrencia,
                    },
                }
                const response = await complaintController.sendComplaint(formattedData)
                console.log(response.data)
                setProtocol(response.data.protocol)
                setOpenSuccessMessageModal(true)
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                enqueueSnackbar('Erro ao enviar formulário', { variant: 'error' });
            }
        }   
    }

    useEffect(() => {
        if (!router.isReady) return
        const getInfo = async () => {
            setLoading(true)
            const tenantController = new TenantController()
            try {
                if (typeof company === 'string') {
                    const data = await tenantController.getBasicInformation(company)
                    setCompanyInfo(data)
                } else {
                    throw Error('invalid company')
                }
                setNoCompany(false)
                if (Cookies.get('termoAceito') === 'sim') {
                    setTermAccepted(true)
                }
            } catch (error) {
                setNoCompany(true)
            }
            setLoading(false)
        }
        getInfo()
    }, [router.isReady])

    const relateTypes = [
        {
            value: 'assedio',
            label: 'Assédio (Moral e/ou sexual)',
            group: 'Assédio',
        },
        {
            value: 'agressao',
            label: 'Agressões físicas',
            group: 'Violência',
        },
        {
            value: 'discriminacao-etnica',
            label: 'Discriminação étnica',
            group: 'Discriminação',
        },
        {
            value: 'discriminacao-racial',
            label: 'Discriminação racial',
            group: 'Discriminação',
        },
        {
            value: 'discriminacao-social',
            label: 'Discriminação social',
            group: 'Discriminação',
        },
        {
            value: 'discriminacao-sexual',
            label: 'Discriminação sexual',
            group: 'Discriminação',
        },
        {
            value: 'discriminacao-física',
            label: 'Discriminação física',
            group: 'Discriminação',
        },
        {
            value: 'favorecimento-fornecedor-concorrencia-desleal',
            label: 'Concorrência desleal',
            group: 'Favorecimento',
        },
        {
            value: 'favorecimento-fornecedor-suborno',
            label: 'Suborno',
            group: 'Favorecimento',
        },
        {
            value: 'favorecimento-fornecedor-irregularidade-financeira',
            label: 'Irregularidade financeira',
            group: 'Favorecimento',
        },
        {
            value: 'favorecimento-em-processo-de-recrutamento-e-selecao',
            label: 'Favorecimento em Processo de Recrutamento e Seleção',
            group: 'Favorecimento',
        },
        {
            value: 'subtracao-de-bens-ou-dinheiro-pessoais',
            label: 'Pessoais',
            group: 'Subtração de bens ou dinheiro',
        },
        {
            value: 'subtracao-de-bens-ou-dinheiro-da-empresa',
            label: 'da Empresa',
            group: 'Subtração de bens ou dinheiro',
        },
        {
            value: 'utilizacao-indevida-de-bens-depreciacao',
            label: 'Depreciação',
            group: 'Utilização indevida',
        },
        {
            value: 'utilizacao-indevida-de-bens-patrimonio',
            label: 'Uso indevido do patrimônio da empresa',
            group: 'Utilização indevida',
        },
        {
            value: 'uso-indevido-da-marca',
            label: 'Uso indevido da marca',
            group: 'Utilização indevida',
        },
        {
            value: 'uso-indevido-de-recursos-da-empresa',
            label: 'Uso indevido de recursos da empresa',
            group: 'Utilização indevida',
        },
        {
            value: 'utilizacao-indevida-de-informacoes privilegiadas',
            label: 'Utilização indevida de informações privilegiadas',
            group: 'Utilização indevida',
        },
        {
            value: 'violacao-de-leis-ambientais',
            label: 'Violação de Leis Ambientais',
            group: 'Meio ambiente',
        },
        {
            value: 'falsificacao-de-documento-da-empresa',
            label: 'Falsificação de documento da empresa',
            group: 'Falsificação',
        },
        {
            value: 'criar-ou-ignorar-perigos-ambientais-ou-de seguranca',
            label: 'Criar/Ignorar perigos ambientais ou de segurança',
            group: 'Perigos',
        },
        {
            value: 'conduta-inadequada-dos-nossos-motoristas-de-transito',
            label: 'Conduta inadequada dos nossos motoristas de trânsito',
            group: 'Conduta',
        },
        {
            value: 'conduta-do-colaborador',
            label: 'Conduta do colaborador',
            group: 'Conduta',
        },
        {
            value: 'conduta-do-gestor',
            label: 'Conduta do gestor',
            group: 'Conduta',
        },
        {
            value: 'relacoes-com-a-comunidade',
            label: 'Relações com a comunidade',
            group: 'Relações',
        },
        {
            value: 'relacoes-com-o-setor-publico',
            label: 'Relações com o Setor Público',
            group: 'Relações',
        },
        {
            value: 'relacoes-com-o-sindicato',
            label: 'Relações com o Sindicato',
            group: 'Relações',
        },
        {
            value: 'vazamento-de-dados-pessoais',
            label: 'Vazamento de dados Pessoais',
            group: 'Outros',
        },
        {
            value: 'corrupcao',
            label: 'Corrupção',
            group: 'Outros',
        },
        {
            value: 'conflito-de-interesses',
            label: 'Conflito de interesses',
            group: 'Outros',
        },
        {
            value: 'fraude',
            label: 'Fraude',
            group: 'Outros',
        },
        {
            value: 'infracao-aos-direitos-humanos-e-discriminacao',
            label: 'Infração aos direitos humanos e discriminação',
            group: 'Outros',
        },
        {
            value: 'descumprimento-de-politicas-normas-ou-procedimentos internos',
            label: 'Descumprimento de Políticas, Normas ou Procedimentos Internos',
            group: 'Outros',
        },
        {
            value: 'destruicao-ou-danos-de-ativos-da-empresa',
            label: 'Destruição ou danos de ativos da empresa',
            group: 'Outros',
        },
        {
            value: 'trabalho-infantil-escravo-ou-forçado',
            label: 'Trabalho infantil, escravo ou forçado',
            group: 'Outros',
        },
        {
            value: 'uso-de-alcool-drogas-ou-porte-e-comercio-de-armas',
            label: 'Uso de álcool, drogas ou porte e comércio de armas',
            group: 'Outros',
        },
        {
            value: 'especificar',
            label: 'Outro - especificar',
            group: 'Outros',
        },
    ]

    const groups: ApolloFormSchemaGroup[] = [
        {
            name: 'Identificação:',
            key: 'identification',
            type: 'label',
            variant: 'h5',
            visible: true,
        },
        {
            name: 'Dados pessoais:',
            key: 'personalData',
            type: 'label',
            variant: 'body1',
            subgroup: 'identification',
            visible: checkIdentification != '',
        },
        {
            name: 'Relação com a empresa:',
            key: 'relationForBusiness',
            type: 'collapse',
            variant: 'h5',
            visible: true,
        },
        {
            name: `Relatar infração:`,
            key: 'raleteInfration',
            type: 'collapse',
            variant: 'h5',
        },
        {
            name: `Sobre seu relato:`,
            key: 'infoRelate',
            type: 'collapse',
            variant: 'h5',
        },
    ]

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'identificacao',
            label: 'Você deseja se identificar?',
            ui: { grid: 12 },
            componenttype: ApolloFormSchemaComponentType.SELECT,
            groupKey: 'identification',
            required: true,
            options: [
                {
                    value: 'false',
                    label: 'Não',
                },
                {
                    value: 'true',
                    label: 'Sim',
                },
            ],
            onChange(e) {
                setCheckIdentification(e.target.value)
            },
        },
        {
            name: 'nome',
            label: 'Qual o seu nome?',
            ui: { grid: 6 },
            required: true,
            groupKey: 'personalData',
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'cargo',
            label: 'Qual o seu cargo?',
            ui: { grid: 6 },
            required: true,
            groupKey: 'personalData',
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'telefone',
            label: 'Qual o seu telefone',
            ui: { grid: 6 },
            required: true,
            groupKey: 'personalData',
            mask: '(99)99999-9999',
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'horario-contato',
            label: 'Qual o melhor horário para contato?',
            ui: { grid: 6 },
            groupKey: 'personalData',
            required: true,
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'email',
            label: 'Qual o seu email?',
            groupKey: 'personalData',
            ui: { grid: checkIdentification && checkIdentification == 'true' ? 6 : 12 },
            required: true,
            componenttype: checkIdentification
                ? ApolloFormSchemaComponentType.EMAIL
                : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'area-atuacao',
            label: 'Área de atuação: ',
            groupKey: 'personalData',
            ui: { grid: 6 },
            required: true,
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'relacao',
            label: 'Qual a sua relação com a XX',
            groupKey: 'relationForBusiness',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                {
                    value: 'colaborador',
                    label: 'Colaborador da empresa',
                },
                {
                    value: 'ex-colaborador',
                    label: 'Ex-colaborador da empresa',
                },
                {
                    value: 'cliente',
                    label: 'Cliente da empresa',
                },
                {
                    value: 'fornecedor-prestador-credenciado',
                    label: 'Fornecedor / Prestador/ Credenciado da empresa',
                },
                {
                    value: 'comunidade',
                    label: 'Comunidade no entorno da empresa',
                },
                {
                    value: 'especificar',
                    label: 'Outro - Especificar',
                },
            ],
            onChange(e) {
                setCheckRelacao(e.target.value)
            },
        },
        {
            name: 'especificar-tipo-relacao',
            label: 'Especifique o tipo de relação',
            groupKey: 'relationForBusiness',
            ui: { grid: 12 },
            required: true,
            componenttype:
                checkRelacao && checkRelacao == 'especificar'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'infracao',
            label: 'Qual infração do código de ética ocorreu? Link do Código de ética',
            groupKey: 'raleteInfration',
            ui: { grid: 12 },
            required: true,
            renderComponent() {
                return (
                    <Grid>
                        <InputLabel sx={{ paddingLeft: '5px' }}>
                            Qual infração do código de ética ocorreu?{' '}
                            <a
                                style={{
                                    textDecoration: 'none',
                                    color: '#5e6d9e',
                                }}
                                href={companyInfo?.linkcondutecode}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Link do código de ética
                            </a>
                        </InputLabel>
                        <TextField
                            onChange={e => setInfracao(e.target.value)}
                            rows={2}
                            maxRows={4}
                            multiline
                            type="text"
                            sx={{ width: '100%' }}
                            placeholder="Informe aqui o código de ética"
                        />
                    </Grid>
                )
            },
        },
        {
            name: 'empresa',
            label: 'Em qual empresa você trabalha?',
            groupKey: 'raleteInfration',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
        {
            name: 'tipo-denuncia',
            label: 'Qual o tipo de denúncia você deseja relatar?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECTSEARCH,
            options: relateTypes,
            onChangeSelectSearch(e) {
                if (e) setCheckTipoDenuncia(e.value)
            },
        },
        {
            name: 'especificar-tipo-denuncia',
            label: 'Especifique o tipo de denúncia',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype:
                checkTipoDenuncia === 'especificar'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'local-ocorrencia',
            label: 'Onde ocorreu o incidente?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
        {
            name: 'data-ocorrencia',
            label: 'Quando esse fato ocorreu?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.DATE,
        },
        {
            name: 'autor-ocorrencia',
            label: 'Quem cometeu o incidente? Informe o nome da pessoa e, se possível, mais detalhes como o sobrenome, área e cargo',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
        {
            name: 'recorrencia-ocorrencia',
            label: 'Esse fato continua ocorrendo?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                {
                    label: 'Sim',
                    value: 'sim',
                },
                {
                    label: 'Não',
                    value: 'nao',
                },
                {
                    label: 'Talvez',
                    value: 'talvez',
                },
            ],
        },
        {
            name: 'testemunhas-ocorrencia',
            label: 'Havia testemunhas?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                {
                    label: 'Sim',
                    value: 'sim',
                },
                {
                    label: 'Não',
                    value: 'nao',
                },
            ],
            onChange(e) {
                setCheckTestemunhas(e.target.value)
            },
        },
        {
            name: 'sim-testemunhas-ocorrencia',
            label: 'Cite o nome das testemunhas que estavam presentes',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype:
                checkTestemunhas && checkTestemunhas == 'sim'
                    ? ApolloFormSchemaComponentType.TEXTAREA
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'nao-testemunhas-ocorrencia',
            label: '',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            renderComponent() {
                if (checkTestemunhas && checkTestemunhas == 'nao')
                    return (
                        <Grid>
                            <InputLabel sx={{ paddingLeft: '5px', wordBreak: 'break-all', whiteSpace: 'unset' }}>
                                Por favor, descreva com o maior nível de detalhes possível o que aconteceu, indicando
                                o(s) nome(s) da(s) pessoa(s) envolvida(s) entre outras informações que você julgar
                                pertinentes. * 0/12.000 caracteres. Escreva o máximo de detalhes possível
                            </InputLabel>
                            <TextField
                                onChange={e => setNaoTestemunhasOcorrencia(e.target.value)}
                                rows={2}
                                maxRows={4}
                                multiline
                                type="text"
                                sx={{ width: '100%' }}
                                placeholder="Descreva aqui"
                            />
                        </Grid>
                    )
                else return <></>
            },
        },
        {
            name: 'grau-de-certeza-denuncia',
            label: 'Qual o grau de certeza sobre o fato que você está denunciando?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                {
                    label: 'Já ouvi dizer',
                    value: 'ja-ouvi-dizer',
                },
                {
                    label: 'Tenho a certeza',
                    value: 'tenho-a-certeza',
                },
                {
                    label: 'Tenho suspeitas',
                    value: 'tenho-suspeitas',
                },
            ],
        },
        {
            name: 'evidencia',
            label: '',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            renderComponent(params) {
                return (
                    <Grid item>
                        <Grid item xs={12}>
                            <InputLabel>
                                Caso você tenha evidências sobre o fato, faça o upload do arquivo aqui. Tamanho máximo:
                                1GB
                            </InputLabel>
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

    if (loading) return <Loading />

    if (noCompany || !companyInfo?.status) return <NoCompany />

    if (!termAccepted && !loading) {
        return (
            <>
                <Head>
                    <title>Termo de aceite</title>
                </Head>
                <AppBar logoUrl={companyInfo?.logo?.url as string} />
                <TermosAceite
                    setTermAccepted={setTermAccepted}
                    companyName={companyInfo?.description ? companyInfo.description : ''}
                />
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Registro</title>
            </Head>
            <AppBar logoUrl={companyInfo?.logo?.url as string} />
            <Grid container lg={8} xs={12} sx={{ margin: '30px auto' }}>
                <ApolloForm
                    schema={formSchema}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    submitButtonText="Enviar"
                    groups={groups}
                    defaultExpandedGroup={true}
                />
            </Grid>
            <SuccessMessageModal
                protocol={protocol}
                open={openSuccesMessageModal}
                setOpen={setOpenSuccessMessageModal}
            />
        </>
    )
}
export default Form
