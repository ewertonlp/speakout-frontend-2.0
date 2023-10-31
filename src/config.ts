import { PATH_PAGE } from './routes/paths'

const ENV: any = process.env.envs
export const BASE_APP = {
    base_url: ENV.BASE_URL_BACKEND,
    site_key: ENV.REACT_APP_SITE_KEY,
    secret_key: ENV.REACT_APP_SECRET_KEY,
}

export const HOST_API_KEY = process.env.HOST_API_KEY || ''

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_PAGE.home // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
    H_MOBILE: 74,
    H_MAIN_DESKTOP: 88,
    H_DASHBOARD_DESKTOP: 92,
    H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
}

export const NAV = {
    W_BASE: 260,
    W_DASHBOARD: 280,
    W_DASHBOARD_MINI: 88,
    //
    H_DASHBOARD_ITEM: 48,
    H_DASHBOARD_ITEM_SUB: 36,
    //
    H_DASHBOARD_ITEM_HORIZONTAL: 32,
}

export const ICON = {
    NAV_ITEM: 24,
    NAV_ITEM_HORIZONTAL: 22,
    NAV_ITEM_MINI: 22,
}
