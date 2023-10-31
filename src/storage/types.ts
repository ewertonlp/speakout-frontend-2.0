import { SetStateAction } from 'react'

export type StorageContextType = {
    currentBusinessId: string
    setCurrentBusinessId: React.Dispatch<SetStateAction<string>>
}
