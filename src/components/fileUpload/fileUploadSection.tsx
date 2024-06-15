import React, { useEffect, useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import { UploadController } from 'controllers/uploadController';
import { IImageUpload } from 'types/IImageUpload';

interface FileUploadSectionProps {
    postId: string;
}

function FileUploadSection({ postId }: FileUploadSectionProps) {
    const [files, setFiles] = useState<IImageUpload[]>([]);

    useEffect(() => {
        const fetchUploadedFiles = async () => {
            const uploadController = new UploadController();
            try {
                const uploadedFiles = await uploadController.getById(postId);
                setFiles([uploadedFiles]);
            } catch (error) {
                console.error('Erro ao buscar arquivos:', error);
            }
        };

        fetchUploadedFiles();
    }, [postId]);

    const handleDownload = async (fileId: string) => {
        // Lógica para fazer o download do arquivo com o fileId fornecido
    };

    return (
        <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Arquivos Anexados</Typography>
            </Grid>
            {files.map((file) => (
                <Grid item key={file.id} xs={12} md={6} lg={4}>
                    <Typography>{file.name}</Typography>
                    <Button onClick={() => handleDownload(file.id)}>Download</Button>
                </Grid>
            ))}
        </Grid>
    );
}

export default FileUploadSection;
