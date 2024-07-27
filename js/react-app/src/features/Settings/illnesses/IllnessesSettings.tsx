import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import type { Illness } from '@/common/types/entities';
import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import MultiSelectCell from '@/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/components/cells/MultiSelectEditCell';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { illnessesSelectors, recommendationsSelectors } from '@/redux/selectors';
import { illnessesActions } from '@/redux/slices/settings/illnesses';
import { validateName } from '@/utils/validators';

export default function IllnessesSettings() {
    const dispatch = useAppDispatch();
    const apiRef = useGridApiRef();

    const illnessesState = useAppSelector(illnessesSelectors.selectAll);
    const recommendations = useAppSelector(recommendationsSelectors.selectAll);

    const [illnesses, setIllnesses] = useState<Illness[]>([]);

    const handleAddIllnesses = useCallback(
        (illness: Illness) => {
            illness.id = uuidv4();
            dispatch(illnessesActions.addIllness(illness));
        },
        [dispatch]
    );

    const handleRemoveIllnesses = useCallback(
        (id: string) => {
            dispatch(illnessesActions.removeIllness(id));
        },
        [dispatch]
    );

    const processRowUpdate = useCallback(
        (newRow: Illness) => {
            if (newRow.id) {
                dispatch(
                    illnessesActions.updateIllness({
                        id: newRow.id,
                        changes: newRow
                    })
                );
            }

            return newRow;
        },
        [dispatch]
    );

    const ILLNESSES_COLUMNS = useMemo(
        () =>
            [
                {
                    field: 'action',
                    headerName: 'Akcje',
                    sortable: false,
                    filterable: false,
                    hideable: false,
                    disableColumnMenu: true,
                    renderCell: (params) => (
                        <ActionCell
                            params={params}
                            onAdd={handleAddIllnesses}
                            onRemove={handleRemoveIllnesses}
                        />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, illnesses);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                },
                {
                    field: 'recommendationIds',
                    headerName: 'Zalecenia',
                    editable: true,
                    type: 'custom',
                    renderEditCell: (params) => (
                        <MultiSelectEditCell
                            params={params}
                            items={recommendations}
                            initialValue={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                            valueFn={(item) => item.id}
                        />
                    ),
                    renderCell: (params) => (
                        <MultiSelectCell
                            params={params}
                            items={recommendations}
                            value={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                        />
                    )
                }
            ] as GridColDef<Illness>[],
        [handleAddIllnesses, handleRemoveIllnesses, illnesses, recommendations]
    );

    useEffect(() => {
        setIllnesses([
            ...illnessesState,
            {
                id: '',
                name: '',
                recommendationIds: []
            }
        ]);
    }, [illnessesState]);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
    }, [illnesses, apiRef]);

    return (
        <AppPageContent title="Choroby">
            <DataGrid
                apiRef={apiRef}
                columns={ILLNESSES_COLUMNS}
                rows={illnesses}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
                autosizeOnMount={true}
            />
        </AppPageContent>
    );
}
