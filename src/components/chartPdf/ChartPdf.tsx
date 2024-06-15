import { useTheme } from '@mui/material/styles'
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { ChartData } from 'types/IChartData'
import { createRoot } from 'react-dom/client'
import StatusChart from './Status'
import IdentificacaoChart from './Identificacao'
import TestemunhasChart from './testemunhas'
import RelacaoEmpresaChart from './RelacaoEmpresa'
import TipoDenunciaChart from './TipoDenuncia'

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
        top: 0,
        left: 0,
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

const ChartPdf = ({
    statusData,
    identifiedData,
    thereWasAWitnessData,
    relationWithCompanyData,
    typeOfComplaintData,
}: ChartData) => {
    const theme = useTheme()
    console.log(statusData)

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text>Status dos Relatos</Text>
                    <StatusChart statusData={statusData} />
                </View>
                <View>
                    <Text>Identificação do Denunciante </Text>
                    <IdentificacaoChart identifiedData={identifiedData} />
                </View>
                <View>
                    <TestemunhasChart thereWasAWitnessData={thereWasAWitnessData} />
                </View>
                <View>
                    <RelacaoEmpresaChart relationWithCompanyData={relationWithCompanyData} />
                </View>
                <View>
                    <TipoDenunciaChart typeOfComplaintData={typeOfComplaintData} />
                </View>
            </Page>
        </Document>
    )
}

export default ChartPdf
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        createRoot(document.getElementById('root')).render(<ChartPdf />)
    })
}
