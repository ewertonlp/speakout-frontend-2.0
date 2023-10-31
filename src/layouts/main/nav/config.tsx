// routes
import { PATH_PAGE } from '../../../routes/paths'
// config
import { PATH_AFTER_LOGIN } from '../../../config'
// components
import Iconify from '../../../components/iconify/Iconify'

// ----------------------------------------------------------------------

const navConfig = [
    {
        title: 'Home',
        icon: <Iconify icon="eva:home-fill" />,
        path: '/',
    },
    {
        title: 'Pages',
        path: '/pages',
        icon: <Iconify icon="eva:file-fill" />,
        children: [
            {
                subheader: 'Other',
                items: [
                    { title: 'About us', path: PATH_PAGE.about },
                    { title: 'Contact us', path: PATH_PAGE.contact },
                ],
            },
            {
                subheader: 'Error',
                items: [
                    { title: 'Page 403', path: PATH_PAGE.page403 },
                    { title: 'Page 404', path: PATH_PAGE.page404 },
                    { title: 'Page 500', path: PATH_PAGE.page500 },
                ],
            },
            {
                subheader: 'Dashboard',
                items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
            },
        ],
    },
]

export default navConfig
