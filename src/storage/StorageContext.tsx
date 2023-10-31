import { createContext, useState } from 'react'
import { StorageContextType } from './types'

export const StorageContext = createContext<StorageContextType | null>(null)

export function StorageProvider({ children }: { children: React.ReactNode }) {
    const [currentBusinessId, setCurrentBusinessId] = useState<string>('')

    return (
        <StorageContext.Provider
            value={{
                currentBusinessId,
                setCurrentBusinessId,
            }}
        >
            {children}
        </StorageContext.Provider>
    )
}
