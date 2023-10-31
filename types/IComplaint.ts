export type IComplaint = {
    tenant: string
    response: Record<string, unknown>
    email: string
    media?: string[]
}
