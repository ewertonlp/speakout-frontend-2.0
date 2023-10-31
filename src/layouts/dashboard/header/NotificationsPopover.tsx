import { noCase } from 'change-case'
import { useState } from 'react'
// @mui
import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
// utils
import { fToNow } from '../../../utils/formatTime'
// _mock_
// components
import { IconButtonAnimate } from '../../../components/animate'
import Iconify from '../../../components/Iconify'
import MenuPopover from '../../../components/menu-popover'
import Scrollbar from '../../../components/Scrollbar'

// ----------------------------------------------------------------------

const _notifications = [...Array(5)].map((_, index) => ({
    id: index.toString(),
    title: ['Your order is placed', 'Sylvan King', 'You have new message', 'You have new mail', 'Delivery processing'][
        index
    ],
    description: [
        'waiting for shipping',
        'answered to your comment on the Minimal',
        '5 unread messages',
        'sent from Guido Padberg',
        'Your order is being shipped',
    ][index],
    avatar: [null, null, null, null, null][index],
    type: ['order_placed', 'friend_interactive', 'chat_message', 'mail', 'order_shipped'][index],
    createdAt: new Date('12/12/2023'),
    isUnRead: [true, true, false, false, false][index],
}))

export default function NotificationsPopover() {
    const [notifications, setNotifications] = useState(_notifications)

    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

    const totalUnRead = notifications.filter(item => item.isUnRead === true).length

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget)
    }

    const handleClosePopover = () => {
        setOpenPopover(null)
    }

    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map(notification => ({
                ...notification,
                isUnRead: false,
            })),
        )
    }

    return (
        <>
            <IconButtonAnimate
                color={openPopover ? 'primary' : 'default'}
                onClick={handleOpenPopover}
                sx={{ width: 40, height: 40 }}
            >
                <Badge badgeContent={totalUnRead} color="error">
                    <Iconify icon="eva:bell-fill" />
                </Badge>
            </IconButtonAnimate>

            <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">Notificações</Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Você tem {totalUnRead} mensagens não lidas
                        </Typography>
                    </Box>

                    {totalUnRead > 0 && (
                        <Tooltip title=" Mark all as read">
                            <IconButton color="primary" onClick={handleMarkAllAsRead}>
                                <Iconify icon="eva:done-all-fill" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                                Novas
                            </ListSubheader>
                        }
                    >
                        {notifications.slice(0, 2).map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </List>

                    <List disablePadding>
                        {notifications.slice(2, 5).map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </List>
                </Scrollbar>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ p: 1 }}>
                    <Button fullWidth disableRipple>
                        Ver todas
                    </Button>
                </Box>
            </MenuPopover>
        </>
    )
}

// ----------------------------------------------------------------------

type NotificationItemProps = {
    id: string
    title: string
    description: string
    avatar: string | null
    type: string
    createdAt: Date
    isUnRead: boolean
}

function NotificationItem({ notification }: { notification: NotificationItemProps }) {
    const { avatar, title } = renderContent(notification)

    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.isUnRead && {
                    bgcolor: 'action.selected',
                }),
            }}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
            </ListItemAvatar>

            <ListItemText
                disableTypography
                primary={title}
                secondary={
                    <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
                        <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
                        <Typography variant="caption">{fToNow(notification.createdAt)}</Typography>
                    </Stack>
                }
            />
        </ListItemButton>
    )
}

// ----------------------------------------------------------------------

function renderContent(notification: NotificationItemProps) {
    const title = (
        <Typography variant="subtitle2">
            {notification.title}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                &nbsp; {noCase(notification.description)}
            </Typography>
        </Typography>
    )

    if (notification.type === 'order_placed') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/notification/ic_package.svg" />,
            title,
        }
    }
    if (notification.type === 'order_shipped') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/notification/ic_shipping.svg" />,
            title,
        }
    }
    if (notification.type === 'mail') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/notification/ic_mail.svg" />,
            title,
        }
    }
    if (notification.type === 'chat_message') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/notification/ic_chat.svg" />,
            title,
        }
    }
    return {
        avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
        title,
    }
}
