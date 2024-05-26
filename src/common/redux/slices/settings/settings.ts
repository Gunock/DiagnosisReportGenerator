import { combineReducers } from '@reduxjs/toolkit';

import { createAppSlice } from '../../redux-common';

import diagnoses from './diagnoses';
import mutations from './mutations';
import staff from './staff';

type RecommendationId = string;
type MutationId = string;

interface Recommendation {
    id: RecommendationId;
    name: string;
    content: string;
    level: 1 | 2 | 3;
    priority: number;
    ageRange: {
        from: number;
        to: number;
    };
}

interface Genes {
    id: string;
    name: string;
    testMethods: string[];
    mutationIds: MutationId[];
}

interface Illness {
    id: string;
    name: string;
    recommendationIds: RecommendationId[];
}

interface SettingsState {
    recommendations: Recommendation[];
    genes: Genes[];
    illnesses: Illness[];
}

const settingsSlice = createAppSlice({
    name: 'settings',
    initialState: {
        mutations: [],
        recommendations: [],
        genes: [],
        illnesses: []
    } as SettingsState,
    reducers: {}
});

const settingsReducer = combineReducers({
    [settingsSlice.name]: settingsSlice.reducer,
    [diagnoses.name]: diagnoses.reducer,
    [mutations.name]: mutations.reducer,
    [staff.name]: staff.reducer
});

export default settingsReducer;

export const settingsActions = settingsSlice.actions;
