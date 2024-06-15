// @mui
import { useTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function StyledNotistack() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        '#__next': {
          '.SnackbarContent-root': {
            width: '100%',
            padding: theme.spacing(1.5),
            margin: theme.spacing(0.5, 0),
            boxShadow: theme.customShadows.dialog,
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.common.white,
           
            '&.SnackbarItem-variantSuccess': {
              backgroundColor: theme.palette.success.dark,
            },
            '&.SnackbarItem-variantError': {
              backgroundColor: theme.palette.error.dark,
            },
            '&.SnackbarItem-variantWarning': {
              backgroundColor: theme.palette.warning.light,
            },
            '&.SnackbarItem-variantInfo': {
              backgroundColor: theme.palette.info.light,
            },
            [theme.breakpoints.up('md')]: {
              minWidth: 240,
            },
          },
          '.SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium,
            FontSize:theme.typography.h2
          },
          '.SnackbarItem-action': {
            marginRight: 0,
            color: theme.palette.action.active,

            '& svg': {
              width: 20,
              height: 20,
            },
          },
        },
      }}
    />
  );

  return inputGlobalStyles;
}
