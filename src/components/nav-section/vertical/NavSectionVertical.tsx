// @mui
import { List, Stack } from '@mui/material'

import { useAuthContext } from 'src/auth/useAuthContext'
import { NavSectionProps } from '../types'
import NavList from './NavList'
import { StyledSubheader } from './styles'
import { checkPermission } from 'src/utils/functions'

// ----------------------------------------------------------------------

export default function NavSectionVertical({ data, sx, ...other }: NavSectionProps) {
    const { user } = useAuthContext()

    return (
        <Stack sx={sx} {...other}>
            {data.map(group => {
                const key = group.subheader || group.items[0].title

                return (
                    <List key={key} disablePadding sx={{ px: 2 }}>
                        {group.subheader && <StyledSubheader disableSticky>{group.subheader}</StyledSubheader>}

                        {group.items.map(list =>
                            checkPermission(user?.role) ? (
                                <NavList
                                    key={list.title + list.path}
                                    data={list}
                                    depth={1}
                                    hasChild={!!list.children}
                                />
                            ) : (
                                !list.adminOnly && (
                                    <NavList
                                        key={list.title + list.path}
                                        data={list}
                                        depth={1}
                                        hasChild={!!list.children}
                                    />
                                )
                            ),
                        )}
                    </List>
                )
            })}
        </Stack>
    )
}
