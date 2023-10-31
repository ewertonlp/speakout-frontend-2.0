import { useContext } from 'react'
//
import { Context } from './JwtContext'

// ----------------------------------------------------------------------

export const useAuthContext = () => {
    const context = useContext(Context)

    if (!context) throw new Error('useAuthContext context must be use inside AuthProvider')

    return context
}
