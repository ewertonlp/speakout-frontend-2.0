import { IRole } from 'types/IRole'

export function removeMask(str: string) {
    return str.replace(/[^0-9]/g, '')
}

export function checkPermission(role?: IRole) {
    if (role) return role.type === 'admin'
}
