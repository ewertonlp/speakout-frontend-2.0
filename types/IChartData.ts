export type StatusChartData = {
    Novos: number
    'Em andamento': number
    'Finalizado procedente': number
    'Finalizado improcedente': number
}
export type RelationWithCompanyChartData = {
    colaborador: number
    'ex-colaborador': number
    cliente: number
    'fornecedor-prestador-credenciado': number
    comunidade: number
    especificar: number
}

export type TypeOfComplaintChartData = {
    Assédio: number
    Violência: number
    Discriminação: number
    Favorecimento: number
    'Subtração de bens ou dinheiro': number
    'Utilização indevida': number
    'Meio ambiente': number
    Falsificação: number
    Perigos: number
    Conduta: number
    Relações: number
    Outros: number
}
export type IdentifiedChartData = {
    identified: number
    notIdentified: number
}
export type ThereWasAWitnessChartData = {
    thereWas: number
    thereWasnt: number
}

export type ChartData = {
    statusData?: StatusChartData
    relationWithCompanyData?: RelationWithCompanyChartData
    typeOfComplaintData?: TypeOfComplaintChartData
    identifiedData?: IdentifiedChartData
    thereWasAWitnessData?: ThereWasAWitnessChartData
    chartData?: any
}
