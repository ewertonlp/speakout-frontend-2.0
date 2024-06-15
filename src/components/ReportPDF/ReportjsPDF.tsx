import { format } from 'date-fns'
import jsPDF from 'jspdf'

const ReportJsPDF = async reportData => {
    try {
        const doc = new jsPDF()
        let y = 195

        doc.text('Relatório de Denúncia', 105, 20, { align: 'center' })
        doc.setFontSize(12)

        doc.text('Informações Gerais', 20, 40)
        doc.text(`ID: ${reportData.data.id}`, 20, 50)
        doc.text(`Protocolo: ${reportData.data.protocol}`, 20, 55)
        doc.text(`Email: ${reportData.data.email}`, 20, 60)
        doc.text(`Status: ${reportData.data.status}`, 20, 65)
        doc.text(`Sensibilidade: ${reportData.data.sensibilidade}`, 20, 70)
        doc.text(`Criado em: ${reportData.data.createdAt}`, 20, 75)
        doc.text(`Atualizado em: ${reportData.data.updatedAt}`, 20, 80)
        doc.text('Detalhes do Denunciante', 20, 90)
        doc.text(`Nome: ${reportData.data.response.name}`, 20, 95)
        doc.text(`Cargo: ${reportData.data.response.cargo}`, 20, 100)
        doc.text(`Email: ${reportData.data.response.email}`, 20, 105)
        doc.text(`Empresa: ${reportData.data.response.empresa}`, 20, 110)
        doc.text(`Relação: ${reportData.data.response.relacao}`, 20, 115)
        doc.text(`Infração: ${reportData.data.response.infracao}`, 20, 120)
        doc.text(`Telefone: ${reportData.data.response.telefone}`, 20, 125)
        doc.text(`Evidência: ${reportData.data.response.evidencia}`, 20, 130)
        doc.text(`Área de Atuação: ${reportData.data.response['area-atuacao']}`, 20, 135)
        doc.text(`Identificação: ${reportData.data.response.identificacao}`, 20, 140)
        doc.text(`Tipo de denúncia: ${reportData.data.response['tipo-denuncia']}`, 20, 145)
        doc.text(
            `Data da ocorrência: ${format(new Date(reportData.data.response['data-ocorrencia']), 'dd/MM/yyyy')}`,
            20,
            150,
        )
        doc.text(`Horário para contato: ${reportData.data.response['horario-contato']}`, 20, 155)
        doc.text(`Autor da ocorrência: ${reportData.data.response['autor-ocorrencia']}`, 20, 160)
        doc.text(`Local da ocorrência: ${reportData.data.response['local-ocorrencia']}`, 20, 165)
        doc.text(`Recorrência da ocorrência: ${reportData.data.response['recorrencia-ocorrencia']}`, 20, 170)
        doc.text(`Testemunhas da ocorrência: ${reportData.data.response['testemunhas-ocorrencia']}`, 20, 175)
        doc.text(`Grau de certeza da denuncia: ${reportData.data.response['grau-certeza-da-denuncia']}`, 20, 180)
        doc.text('Conclusão', 20, 190)
        reportData.data.postcloseds.forEach((postsClosed, index) => {
            doc.text(`Criado em: ${format(new Date(postsClosed.createdAt), 'dd/MM/yyyy')}`, 20, y)
            y += 5
            doc.text(`Menssagem: ${postsClosed.comment}`, 20, y)
            y += 5
            doc.text(`Atualizado: ${format(new Date(postsClosed.updatedAt), 'dd/MM/yyyy')}`, 20, y)
            y += 10
        })

        // doc.save('relatorio.pdf')
        const pdfData = doc.output('blob')
        return pdfData
    } catch (error) {
        console.error('Erro ao gerar PDF:', error)
        return null
    }
}

export default ReportJsPDF
