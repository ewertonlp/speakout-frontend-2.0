import { useTheme } from '@mui/material/styles'
import { Document, Font, Page, Text, View } from '@react-pdf/renderer'
import PizzaChart from 'src/sections/@dashboard/general/analytics/PizzaChart'
import { ChartData } from 'types/IChartData'

Font.register({ family: 'CircularStd-Bold', src: '/fonts/CircularStd-Bold.otf' })

const StatusChart = ({ statusData }: ChartData) => {
    const theme = useTheme()
    console.log(statusData)

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    return (
        <Document>
            <Page>
                <View>
                    <Text>Status dos Relatos</Text>
                    <PizzaChart
                        // data={statusData}
                        title="Status"
                        chart={{
                            series: [
                                { label: 'Novo', value: statusData?.Novos || 0 },
                                { label: 'Em andamento', value: statusData?.['Em andamento'] || 0 },
                                { label: 'Finalizado procedente', value: statusData?.['Finalizado procedente'] || 0 },
                                {
                                    label: 'Finalizado improcedente',
                                    value: statusData?.['Finalizado improcedente'] || 0,
                                },
                            ],
                            colors: theme.palette
                                ? [
                                      theme.palette.primary.dark,
                                      theme.palette.info.dark,
                                      theme.palette.error.dark,
                                      theme.palette.warning.main,
                                  ]
                                : [],
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

export default StatusChart
