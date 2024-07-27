import { createEntityAdapter } from '@reduxjs/toolkit';

import { createAppSlice } from '@/redux/common';
import type { TestMethod } from '@/common/types/entities';

export const testMethodsAdapter = createEntityAdapter<TestMethod>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const testMethodsSlice = createAppSlice({
    name: 'testMethods',
    initialState: testMethodsAdapter.getInitialState(),
    reducers: {
        addTestMethods: testMethodsAdapter.addOne,
        updateTestMethods: testMethodsAdapter.updateOne,
        removeTestMethods: testMethodsAdapter.removeOne
    }
});

export default testMethodsSlice;

export const testMethodsActions = testMethodsSlice.actions;