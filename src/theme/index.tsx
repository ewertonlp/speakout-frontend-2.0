import { useMemo } from 'react'
// @mui
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MUIThemeProvider, ThemeOptions, createTheme } from '@mui/material/styles'
// components
import { useSettingsContext } from '../components/settings'
//
import customShadows from './customShadows'
import GlobalStyles from './globalStyles'
import componentsOverride from './overrides'
import palette from './palette'
import shadows from './shadows'
import typography from './typography'

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
    const { themeMode, themeDirection } = useSettingsContext()

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette: palette(themeMode),
            typography,
            shape: { borderRadius: 5 },
            direction: themeDirection,
            shadows: shadows(themeMode),
            customShadows: customShadows(themeMode),
            components: {
                MuiSelect: {
                    defaultProps: {
                        sx: { textTransform: 'none' },
                    },
                },
            },
        }),
        [themeDirection, themeMode],
    )

    const theme = createTheme(themeOptions)

    theme.components = componentsOverride(theme)

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            {children}
        </MUIThemeProvider>
    )
}
