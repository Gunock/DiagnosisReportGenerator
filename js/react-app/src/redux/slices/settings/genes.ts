import { createEntityAdapter } from '@reduxjs/toolkit';

import { createAppSlice } from '@/redux/common';
import { mutationsActions } from '@/redux/slices/settings/mutations';
import { testMethodsActions } from '@/redux/slices/settings/test-methods';
import type { Gene } from '@/common/types/entities';

export const genesAdapter = createEntityAdapter<Gene>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const genesSlice = createAppSlice({
    name: 'genes',
    initialState: genesAdapter.getInitialState(),
    reducers: {
        addGene: genesAdapter.addOne,
        updateGene: genesAdapter.updateOne,
        removeGene: genesAdapter.removeOne
    },
    // TODO: Add reducers for removing test methods and mutations
    extraReducers: (builder) => {
        builder.addCase(testMethodsActions.removeTestMethods, (state, action) => {
            const testMethodId = action.payload;
            for (const gene of Object.values(state.entities)) {
                const index = gene.testMethodIds.indexOf(testMethodId);
                if (index === -1) {
                    continue;
                }

                gene.testMethodIds.splice(index, 1);
            }
        });

        builder.addCase(mutationsActions.removeMutation, (state, action) => {
            const mutationId = action.payload;
            for (const gene of Object.values(state.entities)) {
                const index = gene.mutationIds.indexOf(mutationId);
                if (index === -1) {
                    continue;
                }

                gene.mutationIds.splice(index, 1);
            }
        });
    }
});

export default genesSlice;

export const genesActions = genesSlice.actions;