import { DropzoneOptions } from 'react-dropzone'
// @mui
import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { ReactNode } from 'react'

// ----------------------------------------------------------------------

export interface CustomFile extends File {
    path?: string
    preview?: string
    lastModifiedDate?: Date
}

export interface UploadProps extends DropzoneOptions {
    error?: boolean
    sx?: SxProps<Theme>
    thumbnail?: boolean
    placeholder?: React.ReactNode
    helperText?: React.ReactNode
    disableMultiple?: boolean
    //
    file?: CustomFile | string | null
    onDelete?: VoidFunction
    //
    files?: (File | string)[]
    onUpload?: VoidFunction
    onRemove?: (file: CustomFile | string) => void
    onRemoveAll?: VoidFunction
}

export interface UploadMultiFileProps extends DropzoneOptions {
    error?: boolean
    files: (File | string)[]
    showPreview: boolean
    onRemove: (file: File | string) => void
    onRemoveAll: VoidFunction
    sx?: SxProps<Theme>
    helperText?: ReactNode | any
}
