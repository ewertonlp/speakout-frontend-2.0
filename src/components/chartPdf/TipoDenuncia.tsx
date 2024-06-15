import { useTheme } from '@mui/material/styles'
import { Document, Font, Page, Text, View } from '@react-pdf/renderer'
import BarChart from 'src/sections/@dashboard/general/analytics/BarChart'
import { ChartData } from 'types/IChartData'

Font.register({ family: 'CircularStd-Bold', src: '/fonts/CircularStd-Bold.otf' })

const TipoDenunciaChart = ({ typeOfComplaintData }: ChartData) => {
    const theme = useTheme()

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    return (
        <Document>
            <Page>
            <View>
                    <Text>Tipos de Denúncia </Text>
                    <BarChart
                                title="Tipos de denúncia"
                                chart={{
                                    series: [
                                        {
                                            label: 'Assédio',
                                            value: typeOfComplaintData?.['Assédio'] || 0,
                                        },
                                        {
                                            label: 'Conduta',
                                            value: typeOfComplaintData?.['Conduta'] || 0,
                                        },
                                        {
                                            label: 'Discriminação',
                                            value: typeOfComplaintData?.['Discriminação'] || 0,
                                        },
                                        {
                                            label: 'Falsificação',
                                            value: typeOfComplaintData?.['Falsificação'] || 0,
                                        },
                                        {
                                            label: 'Favorecimento',
                                            value: typeOfComplaintData?.['Favorecimento'] || 0,
                                        },
                                        {
                                            label: 'Meio ambiente',
                                            value: typeOfComplaintData?.['Meio ambiente'] || 0,
                                        },
                                        {
                                            label: 'Assédio',
                                            value: typeOfComplaintData?.['Perigos'] || 0,
                                        },
                                        {
                                            label: 'Falsificação',
                                            value: typeOfComplaintData?.['Falsificação'] || 0,
                                        },
                                        {
                                            label: 'Violência',
                                            value: typeOfComplaintData?.['Violência'] || 0,
                                        },
                                        {
                                            label: 'Utilização indevida',
                                            value: typeOfComplaintData?.['Utilização indevida'] || 0,
                                        },
                                        {
                                            label: 'Relações com a comunidade ou setor público',
                                            value: typeOfComplaintData?.['Relações'] || 0,
                                        },
                                        {
                                            label: 'Outros',
                                            value: typeOfComplaintData?.['Outros'] || 0,
                                        },
                                    ],
                                    colors: [
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                        theme.palette.error.main,
                                    ],
                                }}
                                style={{
                                    backgroundColor: theme.palette.background.paper,
                                    border: `1px solid ${borderColor}`,
                                }}
                            />
                </View>
            </Page>
        </Document>
    )
}

export default TipoDenunciaChart
