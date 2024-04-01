import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import { ISelectOption } from 'types/ISelectOption'
import { useTheme } from '@mui/material/styles';

export function GrayTypography({ children, ...other }: { children: ReactNode }) {
    const theme = useTheme();
    const titleColor = theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.secondary;
    return (
        <Typography style={{ color: titleColor }} {...other}>
            {children}
        </Typography>
    )
}

export function BlackTypography({ children, ...other }: { children: ReactNode }) {
    const theme = useTheme();
    const titleColor = theme.palette.mode === 'dark' ? theme.palette.text.disabled : theme.palette.text.disabled;
    return (
        <Typography style={{ color: titleColor }} {...other}>
            {children}
        </Typography>
    )
}

export function TitleTypography({ children, ...other }: { children: ReactNode }) {
    const theme = useTheme();
    const titleColor = theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.primary;
    return (
        <Typography variant="h5" style={{ color: titleColor }} {...other}>
            {children}
        </Typography>
    )
}

export function ColumnGrid({ children, ...other }: { children: ReactNode }) {
    return (
        <Grid {...other} display="flex" flexDirection="column">
            {children}
        </Grid>
    )
}

export function RowGrid({ children, ...other }: { children: ReactNode }) {
    return (
        <Grid display="flex" flexDirection="row" {...other}>
            {children}
        </Grid>
    )
}

export function CardItem({ title, value }: { title: string; value: string }) {
    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column', marginY: '12px', rowGap: '5px' }}>
            <GrayTypography>{title}</GrayTypography>
            <BlackTypography>
                {value === '' || value === undefined ? '-' : value && value?.replaceAll('-', ' ')}
            </BlackTypography>
        </Grid>
    )
}

export function EditableCardItem({
    title,
    value,
    filled,
    selectOptions,
    handleSave,
}: {
    title: string
    value: string
    filled?: boolean
    selectOptions: ISelectOption[]
    handleSave: (item: string, func: () => void) => void
}) {
    const [editMode, setEditMode] = useState(false)

    const [selectedValue, setSelectedValue] = useState<string>('')

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value as string)
    }

    function convertText(text: string) {
        if (text == null) {
            return '-'
        }
        text = text.replaceAll('-', ' ')
        switch (text) {
            case 'novo':
                return 'Novo'
            case 'concluido_procedente':
                return 'Concluído Procedente'
            case 'concluido_improcedente':
                return 'Concluído Improcedente'
            case 'cancelado':
                return 'Cancelado'
            case 'em_progresso':
                return 'Em progresso'
            case 'media':
                return 'Média'
            case 'baixa':
                return 'Baixa'
            case 'alta':
                return 'Alta'

            default:
                return text
        }
    }

    const backgroundColors = {
        alta: 'error',
        cancelado: 'error',
        media: 'warning',
        em_progresso: 'warning',
        baixa: 'success',
        novo: 'info',
        concluido: 'success',
    }

    function handleCloseEditMode() {
        setEditMode(false)
    }

    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column', marginY: '12px', rowGap: '5px', width: '100%' }}>
            <GrayTypography>{title}</GrayTypography>
            {!editMode ? (
                <Grid display="flex" alignItems="center" justifyContent="space-between">
                    {!filled ? (
                        <BlackTypography>
                            {value === '' || value === undefined ? '-' : convertText(value)}
                        </BlackTypography>
                    ) : (
                        <Button
                            variant="contained"
                            color={backgroundColors[value]}
                            sx={{ width: '80px', color: 'white' }}
                        >
                            {convertText(value)}
                        </Button>
                    )}
                    <div
                        style={{
                            marginLeft: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                            cursor: 'pointer',
                        }}
                        onClick={() => setEditMode(true)}
                    >
                        <ModeEditIcon sx={{ color: '#a7a7a7' }} />
                    </div>
                </Grid>
            ) : (
                <FormControl fullWidth>
                    <InputLabel id="select-label" color="secondary">
                        {title}
                    </InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selectedValue}
                        label={title}
                        onChange={handleChange}
                        sx={{ height: '3rem' }}
                    >
                        {selectOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <Grid display="flex" justifyContent="space-around" mt={1}>
                        <Button
                            sx={{ width: '40%' }}
                            variant="outlined"
                            color="error"
                            onClick={() => setEditMode(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            sx={{ width: '40%' }}
                            variant="outlined"
                            color="success"
                            onClick={() => handleSave(selectedValue, handleCloseEditMode)}
                        >
                            Salvar
                        </Button>
                    </Grid>
                </FormControl>
            )}
        </Grid>
    )
}
