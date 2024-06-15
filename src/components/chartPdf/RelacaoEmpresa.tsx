import { useTheme } from '@mui/material/styles'
import { Document, Font, Page, Text, View } from '@react-pdf/renderer'
import BarChart from 'src/sections/@dashboard/general/analytics/BarChart'
import { ChartData } from 'types/IChartData'

Font.register({ family: 'CircularStd-Bold', src: '/fonts/CircularStd-Bold.otf' })

const RelacaoEmpresaChart = ({ relationWithCompanyData }: ChartData) => {
    const theme = useTheme()

    const borderColor = theme.palette.mode === 'dark' ? '#424249' : '#d2d2d2'

    return (
        <Document>
            <Page>
                <View>
                    <Text>Relação com a Empresa </Text>
                    <BarChart
                        title="Relação com a empresa"
                        chart={{
                            series: [
                                {
                                    label: 'Colaborador da empresa',
                                    value: relationWithCompanyData?.['colaborador'] || 0,
                                },
                                {
                                    label: 'Ex-colaborador da empresa',
                                    value: relationWithCompanyData?.['ex-colaborador'] || 0,
                                },
                                { label: 'Cliente da empresa', value: relationWithCompanyData?.['cliente'] || 0 },
                                {
                                    label: 'Fornecedor / Prestador / Credenciado da empresa',
                                    value: relationWithCompanyData?.['fornecedor-prestador-credenciado'] || 0,
                                },
                                {
                                    label: 'Comunidade no entorno da empresa',
                                    value: relationWithCompanyData?.['comunidade'] || 0,
                                },
                                { label: 'Outros', value: relationWithCompanyData?.['especificar'] || 0 },
                            ],
                            colors: [
                                theme.palette.info.dark,
                                theme.palette.info.dark,
                                theme.palette.info.dark,
                                theme.palette.info.dark,
                                theme.palette.info.dark,
                                theme.palette.info.dark,
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

export default RelacaoEmpresaChart
