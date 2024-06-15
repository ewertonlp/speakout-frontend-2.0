import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'product' | 'menu' | 'card'

declare module '@mui/material/styles/createPalette' {
    interface TypeBackground {
        neutral: string
    }
    interface SimplePaletteColorOptions {
        lighter: string
        darker: string
    }
    interface PaletteColor {
        lighter: string
        darker: string
    }
}

// SETUP COLORS
const GREY = {
    0: '#FFFFFF',
    100: '#F0F2F5',
    200: '#E1E1E6',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#8D8D99',
    800: '#424249',
    900: '#1D1D1E',
    bg: '#F0F2F5',
}

const PRIMARY = {
    lighter: '#97CD6C',
    light: '#89C559',
    main: '#7EB353',
    dark: '#6A9546',
    darker: '#587D3A',
    contrastText: '#fff',
}

const PRODUCT = {
    link: '#2E97BA',
    button: '#59B15E',
    text: '#8D8D99',
    hover: '#59595A',
    menu: '#1F283E',
}

const BUTTON = {
    normal: '#59B15E',
    hover: '#458748',
}

const SECONDARY = {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
    darker: '#091A7A',
    contrastText: '#fff',
}

const INFO = {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#fff',
}

const SUCCESS = {
    lighter: '#D8FBDE',
    light: '#86E8AB',
    main: '#36B37E',
    dark: '#1B806A',
    darker: '#0A5554',
    contrastText: '#fff',
}

const WARNING = {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: GREY[800],
}

const ERROR = {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#fff',
}

const COMMON = {
    common: { black: '#000', white: '#fff' },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    product: PRODUCT,
    divider: alpha(GREY[700], 0.32),
    action: {
        hover: alpha(GREY[500], 0.08),
        selected: alpha(GREY[500], 0.16),
        disabled: alpha(GREY[500], 0.8),
        disabledBackground: alpha(GREY[500], 0.24),
        focus: alpha(GREY[500], 0.24),
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
    placeholder: {
        color: '#C4CDD5', 
    }
}

export default function palette(themeMode: 'light' | 'dark') {
    const light = {
        ...COMMON,
        mode: 'light',
        text: {
            primary: GREY[900],
            secondary: GREY[800],
            disabled: GREY[600],
        },
        background: { paper: '#fff', default: '#F0F2F5', neutral: GREY[200] },
        menu: { paper: '#C4C4CC', default: '#1F283E', neutral: GREY[200] },
        card: {paper: '#C4C4CC', default: '#FFFFFF', neutral: GREY[200]},
        action: {
            ...COMMON.action,
            active: GREY[600],
        },
    } as const

    const dark = {
        ...COMMON,
        mode: 'dark',
        text: {
            primary: '#F0F2F5',
            secondary: GREY[400],
            disabled: GREY[600],
        },
        background: {
            paper: '#1F283E',
            default: '#141A29',
            neutral: alpha(GREY[500], 0.16),
        },
        card: {paper: '#C4C4CC', default: '#1F283E', neutral: GREY[200]},
        action: {
            ...COMMON.action,
            active: GREY[500],
        },
    } as const

    return themeMode === 'light' ? light : dark
}
