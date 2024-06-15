import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'

Font.register({ family: 'CircularStd-Bold', src: '/fonts/CircularStd-Bold.otf' })

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    logo: {
        width: '100vw',
        height: '150px',
        position: 'absolute',
      top:0,
      left:0
    },
    header: {
        width: '100%',
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 4,
        marginBottom: 20,
        padding: 10,
    },
    headerText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 20,
        color: '#161C24',
        fontFamily: 'CircularStd-Bold',
    },
    subheader: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5,
        color: '#161C24',
        fontFamily: 'CircularStd-Bold',
    },
    text: {
        flexWrap: 'wrap',
        flexShrink: 1,
        marginTop: 3,
        marginRight: 8,
        fontSize: 11,
        color: '#212B36',
    },
    itemLabel: {
        margin: 5,
        fontSize: 11,
        color: '#161C24',
    },
    userSection: {
        margin: 5,
        padding: 5,
    },
})

const ReportPDF = ({ reportData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image
                    src={{ uri: '/header.jpg', method: 'GET', headers: { 'Cache-Control': 'no-cache' }, body: '' }}/>
                <Text style={styles.headerText}>Relatório de Denúncia</Text>
            </View>
            <Text style={styles.subheader}>Informações Gerais</Text>
            <View style={styles.section}>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Id: </Text>
                    {reportData.data.id}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Protocol: </Text>
                    {reportData.data.protocol}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Email: </Text>
                    {reportData.data.email}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Status: </Text>
                    {reportData.data.status}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Sensibilidade: </Text>
                    {reportData.data.sensibilidade}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Criado em: </Text>
                    {format(new Date(reportData.data.createdAt), 'dd/MM/yyyy')}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Atualizado em: </Text>
                    {format(new Date(reportData.data.updatedAt), 'dd/MM/yyyy')}
                </Text>
            </View>

            <Text style={styles.subheader}>Detalhes do Denunciante</Text>
            <View style={styles.section}>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Nome: </Text>
                    {reportData.data.response.nome}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Cargo: </Text>
                    {reportData.data.response.cargo}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Email: </Text>
                    {reportData.data.response.email}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Empresa: </Text>
                    {reportData.data.response.empresa}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Relação: </Text>
                    {reportData.data.response.relacao}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Infração: </Text>
                    {reportData.data.response.infracao}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Telefone: </Text>
                    {reportData.data.response.telefone}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Evidência: </Text>
                    {reportData.data.response.evidencia}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Área de atuação: </Text>
                    {reportData.data.response['area-atuacao']}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Identificação: </Text>
                    {reportData.data.response.identificacao}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Tipo de denúncia: </Text>
                    {reportData.data.response['tipo-denuncia'].label}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Data da ocorrência: </Text>
                    {format(new Date(reportData.data.response['data-ocorrencia']), 'dd/MM/yyyy')}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Horário do contato: </Text>
                    {reportData.data.response['horario-contato']}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Autor da ocorrência: </Text>
                    {reportData.data.response['autor-ocorrencia']}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Local da ocorrência: </Text>
                    {reportData.data.response['local-ocorrencia']}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Recorrência da ocorrência: </Text>
                    {reportData.data.response['recorrencia-ocorrencia']}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Testemunhas da ocorrência: </Text>
                    {reportData.data.response['testemunhas-ocorrencia']}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.itemLabel}>Grau de certeza da denúncia: </Text>
                    {reportData.data.response['grau-de-certeza-denuncia']}
                </Text>
            </View>

            {/* <Text style={styles.subheader}>Comitê:</Text>
            <View style={styles.section}>
                {reportData.data.users.map(user => (
                    <View style={styles.userSection} key={user.id}>
                        <Text style={styles.text}>Nome: {user.fullname}</Text>
                        <Text style={styles.text}>Email: {user.email}</Text>
                        <Text style={styles.text}>Criado em: {format(new Date(user.createdAt), 'dd/MM/yyyy')}</Text>
                        <Text style={styles.text}>Atualizado: {format(new Date(user.updatedAt), 'dd/MM/yyyy')}</Text>
                    </View>
                ))}
            </View> */}

            {/* <Text style={styles.subheader}>Chat com Manifestante</Text>
            <View style={styles.section}>
                {reportData.data.posthistories.map(message => (
                    <View style={styles.userSection} key={message.id}>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>
                                Criado em: {format(new Date(message.createdAt), 'dd/MM/yyyy')}
                            </Text>
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>Mensagem: </Text>
                            {message.comment}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>
                                Atualizado: {format(new Date(message.createdAt), 'dd/MM/yyyy')}
                            </Text>
                        </Text>
                    </View>
                ))}
            </View> */}

            <Text style={styles.subheader}>Conclusão</Text>
            <View style={styles.section}>
                {reportData.data.postcloseds.map(postsClosed => (
                    <View style={styles.userSection} key={postsClosed.id}>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>Criado em: </Text>
                            {format(new Date(postsClosed.createdAt), 'dd/MM/yyyy')}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>Message: </Text>
                            {postsClosed.comment}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>Atualizado: </Text>
                            {format(new Date(postsClosed.updatedAt), 'dd/MM/yyyy')}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default ReportPDF
