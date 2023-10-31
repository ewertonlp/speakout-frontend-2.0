import { createContext, useEffect, useState } from 'react'
// utils
import UserController from 'controllers/userController'
import { IDashUserGet } from 'types/IDashUser'
import { ContextType } from './types'

// ----------------------------------------------------------------------

export const Context = createContext<ContextType | null>(null)

// ----------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [tenantId, setTenantId] = useState<string | undefined>()

    const [user, setUser] = useState<IDashUserGet>()

    const getUser = async () => {
        const userController = new UserController()
        try {
            const user = await userController.getCurrentUserInfo()
            setUser(user)
            setTenantId(user.tenant.id)
        } catch (error) {}
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Context.Provider
            value={{
                tenantId,
                setTenantId,
                user,
            }}
        >
            {children}
        </Context.Provider>
    )
}
