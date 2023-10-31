export type CalculatorState = {
    isLoading: boolean
    error: any | null
    lateIcmsManager: LateIcmsManager
    lateIcmsResult: any | null
}

export type LateIcmsManager = {
    dueDate: string
    paymentDate: string
    valueLateIcms: string
}
