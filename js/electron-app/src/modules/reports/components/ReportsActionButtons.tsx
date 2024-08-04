import { type ChangeEvent, useCallback } from 'react';

import { Button, Grid } from '@mui/material';

import VisuallyHiddenInput from '@/modules/core/components/VisuallyHiddenInput';
import { MimeType, saveFile } from '@/modules/core/utils/file-util';
import ExportService from '@/modules/reports/services/ExportService';
import { ImportService } from '@/modules/reports/services/ImportService';
import { type Patient } from '@/types/patient';

interface MainPageActionButtonsProps {
    patientData: Patient[];
    onFileImport: (patients: Patient[]) => void;
}

export default function ReportsActionButtons(props: MainPageActionButtonsProps) {
    const handleFileChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            event.target.value = '';

            if (!file) {
                return;
            }

            let patientData: Patient[];
            if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                const fileData = new Uint8Array(await file.arrayBuffer());
                patientData = await ImportService.parseExcelFile(fileData);
            } else {
                const fileData = await file.text();
                patientData = await ImportService.parseCsvFile(fileData);
            }

            props.onFileImport(patientData);
        },
        [props]
    );

    const handleReportGeneration = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            // Reset the input value to allow the same file to be selected again
            event.target.value = '';

            if (!file || !props.patientData.length) {
                return;
            }

            const fileData = new Uint8Array(await file.arrayBuffer());
            const zipData = await ExportService.generateReport(fileData, props.patientData);

            const filenameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');

            const filename = `${filenameWithoutExtension}-${new Date().toLocaleDateString()}.zip`;

            saveFile(zipData, filename, MimeType.zip);
        },
        [props.patientData]
    );

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Button component="label" role="none" variant="contained">
                    Importuj plik
                    <VisuallyHiddenInput
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                        type="file"
                    />
                </Button>
            </Grid>
            <Grid item>
                <Button
                    component="label"
                    role="none"
                    variant="contained"
                    disabled={!props.patientData.length}
                >
                    Generuj raporty
                    <VisuallyHiddenInput
                        accept=".docx"
                        title={'Wybierz plik szablonu raportu'}
                        value={undefined}
                        onChange={handleReportGeneration}
                        type="file"
                    />
                </Button>
            </Grid>
        </Grid>
    );
}