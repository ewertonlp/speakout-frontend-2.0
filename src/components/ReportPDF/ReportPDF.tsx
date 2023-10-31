import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'

Font.register({ family: 'CircularStd-Bold', src: '/fonts/CircularStd-Bold.otf' })

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#F4F6F7',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        backgroundColor: '#EBF5FB',
        borderRadius: 5,
    },
    header: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#1A5276',
        fontFamily: 'CircularStd-Bold',
    },
    subheader: {
        fontSize: 14,
        margin: 10,
        color: '#21618C',
        fontFamily: 'CircularStd-Bold',
    },
    text: {
        margin: 5,
        fontSize: 12,
        color: '#17202A',
    },
    itemLabel: {
        margin: 5,
        fontSize: 12,
        color: '#17202A',
        fontFamily: 'CircularStd-Bold',
    },
    userSection: {
        margin: 10,
        padding: 10,
        backgroundColor: '#D6EAF8',
        borderRadius: 5,
    },
})

const ReportPDF = ({ reportData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Relatório de Denúncia</Text>
                <Text style={styles.subheader}>Informações Gerais</Text>
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
                <Text style={styles.subheader}>Detalhes do Denunciante</Text>
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
                <Text style={styles.subheader}>Comitê:</Text>
                {reportData.data.users.map(user => (
                    <View style={styles.userSection} key={user.id}>
                        <Text style={styles.text}>Nome: {user.fullname}</Text>
                        <Text style={styles.text}>Email: {user.email}</Text>
                        <Text style={styles.text}>Criado em: {format(new Date(user.createdAt), 'dd/MM/yyyy')}</Text>
                        <Text style={styles.text}>Atualizado: {format(new Date(user.updatedAt), 'dd/MM/yyyy')}</Text>
                    </View>
                ))}
                <Text style={styles.subheader}>Chat com Manifestante</Text>
                {reportData.data.posthistories.map(message => (
                    <View style={styles.userSection} key={message.id}>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>
                                Criado em: {format(new Date(message.createdAt), 'dd/MM/yyyy')}
                            </Text>
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>Message: </Text>
                            {message.comment}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>
                                Atualizado: {format(new Date(message.createdAt), 'dd/MM/yyyy')}
                            </Text>
                        </Text>
                    </View>
                ))}

                <Text style={styles.subheader}>Conclusão</Text>
                {reportData.data.postcloseds.map(postsClosed => (
                    <View style={styles.userSection} key={postsClosed.id}>
                        <Text style={styles.text}>
                            <Text style={styles.itemLabel}>Criado em: </Text>
                            {postsClosed.createdAt}
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
