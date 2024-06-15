import { useTheme } from '@mui/material/styles'
import { Document, Font, Page, Text, View } from '@react-pdf/renderer'
import PizzaChart from 'src/sections/@dashboard/general/analytics/PizzaChart'
import { ChartData } from 'types/IChartData'

Font.register({ family: 'CircularStd-Bold', src: '/fonts/CircularStd-Bold.otf' })

const IdentificacaoChart = ({ identifiedData }: ChartData) => {
    const theme = useTheme()

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    return (
        <Document>
            <Page>
                <View>
                    <Text>Identificação do Denunciante </Text>
                    <PizzaChart
                        // data={identifiedData}
                        title="Denunciante se identificou"
                        chart={{
                            series: [
                                { label: 'Anônimo', value: identifiedData?.notIdentified || 0 },
                                { label: 'Identificado', value: identifiedData?.identified || 0 },
                            ],
                            colors: [theme.palette.info.dark, theme.palette.warning.main],
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

export default IdentificacaoChart
