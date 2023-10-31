// ----------------------------------------------------------------------

import React, { SetStateAction } from 'react'
import { IDashUserGet } from 'types/IDashUser'

export type ContextType = {
    tenantId: string | undefined
    setTenantId: React.Dispatch<SetStateAction<string | undefined>>
    user?: IDashUserGet
}
