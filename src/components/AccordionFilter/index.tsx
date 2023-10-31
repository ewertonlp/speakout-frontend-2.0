import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import { IChangeEvent } from '@rjsf/core'
import ApolloForm, { ApolloFormSchemaItem } from '../apollo-form/ApolloForm.component'

interface Props {
    schemaForm: ApolloFormSchemaItem[]
    setFilters: (data: any) => void
    customSubmit?: (formItems: IChangeEvent) => void
    formData: any
}

export default function AccordionFilter({ schemaForm, setFilters, customSubmit, formData }: Props) {
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
        <Grid item xs={12} sx={{ boxShadow: '1px 1px 10px #ccc', borderRadius: 1 }}>
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12}>
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
