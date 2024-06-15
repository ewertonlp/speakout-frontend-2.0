import { PDFViewer } from '@react-pdf/renderer'

// import { createRoot } from 'react-dom/client'
import { ChartData } from 'types/IChartData'
import ChartPdf from './ChartPdf'

const PdfViewerPage = ({
    statusData,
    identifiedData,
    thereWasAWitnessData,
    relationWithCompanyData,
    typeOfComplaintData,
    chartData,
}: ChartData) => (
    <PDFViewer>
        <ChartPdf chartData={chartData} />
    </PDFViewer>
)
export default PdfViewerPage

// if (typeof document !== 'undefined') {
//     document.addEventListener('DOMContentLoaded', function () {
//         createRoot(document.getElementById('root')).render(<PdfViewerPage chartData={chartData} />)
//     })
// }
