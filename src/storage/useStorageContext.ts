import { useContext } from 'react'
import { StorageContext } from './StorageContext'

export const useStorageContext = () => {
    const context = useContext(StorageContext)

    if (!context) throw new Error('useStorageContext must be used inside StorageProvider')

    return context
}
