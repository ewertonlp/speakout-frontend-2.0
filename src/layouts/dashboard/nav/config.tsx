// routes
// components
import { PATH_PAGE } from 'src/routes/paths'
import SvgColor from '../../../components/svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

const ICONS = {
    blog: icon('ic_blog'),
    cart: icon('ic_cart'),
    chat: icon('ic_chat'),
    mail: icon('ic_mail'),
    user: icon('ic_user'),
    file: icon('ic_file'),
    lock: icon('ic_lock'),
    label: icon('ic_label'),
    blank: icon('ic_blank'),
    kanban: icon('ic_kanban'),
    folder: icon('ic_folder'),
    banking: icon('ic_banking'),
    booking: icon('ic_booking'),
    invoice: icon('ic_invoice'),
    calendar: icon('ic_calendar'),
    disabled: icon('ic_disabled'),
    external: icon('ic_external'),
    menuItem: icon('ic_menu_item'),
    ecommerce: icon('ic_ecommerce'),
    analytics: icon('ic_analytics'),
    dashboard: icon('ic_dashboard'),
    business: icon('ic_business'),
    paper: icon('ic_paper'),
    parchment: icon('ic_parchment'),
    report: icon('ic_report'),
    area: icon('ic_area'),
    home: icon('ic_home'),
}

const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'Menu',
        items: [
            { title: 'Dashboard', path: PATH_PAGE.home, icon: ICONS.home, adminOnly: true },
            // { title: 'Dashboard', path: PATH_PAGE.reports, icon: ICONS.report, adminOnly: true },
            { title: 'Relatos', path: PATH_PAGE.narratives, icon: ICONS.parchment },
            { title: 'Áreas de atuação', path: PATH_PAGE.areas, icon: ICONS.area, adminOnly: true },
            { title: 'Usuários', path: PATH_PAGE.users, icon: ICONS.user, adminOnly: true },
            { title: 'Empresas', path: PATH_PAGE.companies, icon: ICONS.business, adminOnly: true },
            { title: 'Treinamentos', path: PATH_PAGE.training, icon: ICONS.folder, adminOnly: true },
        ],
    },
]

export default navConfig
