import Brightness3Icon from '@mui/icons-material/Brightness3'
import LightModeIcon from '@mui/icons-material/LightMode'
import { IconButton } from '@mui/material'

function ThemeToggle({ themeMode, onToggleMode }) {
  const handleToggle = () => {
    onToggleMode(); // Chame a função de alternância de modo quando o botão for clicado
  }

    return (
        <IconButton onClick={handleToggle} color="inherit">
            {themeMode === 'dark' ? (
                <LightModeIcon sx={{ color: '#FFAB00', fontSize: '1.75rem' }} />
            ) : (
                <Brightness3Icon sx={{ color: '#FFAB00', fontSize: '1.75rem' }} />
            )}
        </IconButton>
    )
}

export default ThemeToggle
