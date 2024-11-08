import React, { useCallback, useState } from 'react';

import { Grid2 } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import LoadingContainer from '@/modules/core/components/LoadingContainer';
import PatientsDataGrid from '@/modules/reports/components/PatientsDataGrid';
import ReportsActionButtons from '@/modules/reports/components/ReportsActionButtons';
import { type Patient } from '@/types/patient';

function Reports() {
    const [patientData, setPatientData] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(false);

    const processRowUpdate = useCallback((newRow: Patient) => {
        setPatientData((prevPatientData) =>
            prevPatientData.map((patient) =>
                patient.id === newRow.id ? { ...patient, ...newRow } : patient
            )
        );
    }, []);

    const onFileImport = useCallback((newPatientData: Patient[]) => {
        setLoading(true);
        setPatientData(newPatientData);
        window.setTimeout(async () => {
            setLoading(false);
        }, 100);
    }, []);

    return (
        <AppPageContent title="Pacjenci">
            <Grid2
                container
                flexDirection="column"
                height="100%"
                width="100%"
                spacing={3}
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
            >
                <Grid2 flexShrink={0} minWidth={0} minHeight={0} maxWidth="100%">
                    <ReportsActionButtons onFileImport={onFileImport} patientData={patientData} />
                </Grid2>
                <Grid2 flex={1} minWidth={0} minHeight={0} maxWidth="100%">
                    <LoadingContainer loading={loading}>
                        <PatientsDataGrid patients={patientData} onRowUpdate={processRowUpdate} />
                    </LoadingContainer>
                </Grid2>
            </Grid2>
        </AppPageContent>
    );
}

export const Route = createFileRoute('/reports/')({
    component: Reports
});
