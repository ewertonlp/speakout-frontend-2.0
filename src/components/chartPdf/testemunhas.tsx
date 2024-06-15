import { useTheme } from '@mui/material/styles'
import { Document, Font, Page, Text, View } from '@react-pdf/renderer'
import PizzaChart from 'src/sections/@dashboard/general/analytics/PizzaChart'
import { ChartData } from 'types/IChartData'

Font.register({ family: 'CircularStd-Bold', src: '/fonts/CircularStd-Bold.otf' })

const TestemunhasChart = ({ thereWasAWitnessData }: ChartData) => {
    const theme = useTheme()

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    return (
        <Document>
            <Page>
                <View>
                    <Text>Testemunhas </Text>
                    <PizzaChart
                        // data={thereWasAWitnessData}
                        title="Havia testemunhas"
                        chart={{
                            series: [
                                { label: 'Sim', value: thereWasAWitnessData?.thereWas || 0 },
                                { label: 'Não', value: thereWasAWitnessData?.thereWasnt || 0 },
                            ],
                            colors: [theme.palette.info.dark, theme.palette.error.dark],
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

export default TestemunhasChart
