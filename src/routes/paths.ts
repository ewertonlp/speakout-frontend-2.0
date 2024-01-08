// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
    return `${root}${sublink}`
}

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    login: '/login',
    register: '/register',
    resetPassword: '/reset-password',
    newPassword: '/new-password',
    forgotPassword: '/forgot-password',
    userConfirmation: '/user-confirmation',
}

export const PATH_PAGE = {
    about: '/about-us',
    contact: '/contact-us',
    page403: '/403',
    page404: '/404',
    page500: '/500',
    reports: '/relatorios',
    companies: '/empresas',
    narratives: '/relatos',
    users: '/usuarios',
    areas: '/areasdeatuacao',
    home: '/home',
    training: '/treinamentos'
}
