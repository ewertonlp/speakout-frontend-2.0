import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import { IChangeEvent } from '@rjsf/core'
import ApolloForm, { ApolloFormSchemaItem } from '../apollo-form/ApolloForm.component'
import { useTheme } from '@mui/material/styles'

interface Props {
    schemaForm: ApolloFormSchemaItem[]
    setFilters: (data: any) => void
    customSubmit?: (formItems: IChangeEvent) => void
    formData: any
}

export default function AccordionFilter({ schemaForm, setFilters, customSubmit, formData }: Props) {
    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'dark' ? '#141A29' : "#f5f5f5" 
    function onSubmit(data: any) {
        setFilters(data)
    }

    function clearFilters() {
        if (!formData.status) {
            setFilters({})
            return
        }
        setFilters({ status: true })
    }

    return (
        <Grid item xs={12} sx={{ boxShadow: '1px 1px 10px rgba(0,0,0,0.1)', borderRadius: 1, }}>
            <Accordion defaultExpanded={true} >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#ffffff'}} />} aria-controls="panel1a-content" id="panel1a-header" sx={{backgroundColor:'#1F283E',paddingX: '1rem', paddingY: '0.25rem', borderRadius:'10px',}}>
                    <Typography sx={{fontSize:'1rem', letterSpacing:'1px',  marginRight: 'auto',   color:"#fff"}}>Pesquisar Usuário</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor: backgroundColor }}>
                    <Grid item xs={12} >
                        <ApolloForm
                            schema={schemaForm}
                            initialValues={formData}
                            onSubmit={onSubmit}
                            submitButtonText="Filtrar"
                            defaultExpandedGroup={true}
                        />
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}
