import { TRootState } from './configureStore';
import {
    createSlice,
    createSelector,
    PayloadAction,
    CaseReducer,
} from '@reduxjs/toolkit';

type TMeal = {
    mealId: string;
};

type TSliceState = {
    ids: string[];
};

const initialState: TSliceState = {
    ids: [],
};

const favoriteAddedReducer: CaseReducer<TSliceState, PayloadAction<TMeal>> = (
    meals,
    action
) => {
    const { mealId } = action.payload;
    meals.ids = [...new Set(meals.ids).add(mealId)];
};

const favoriteRemovedReducer: CaseReducer<TSliceState, PayloadAction<TMeal>> = (
    meals,
    action
) => {
    const { mealId } = action.payload;
    meals.ids = meals.ids.filter((id) => id !== mealId);
};

const slice = createSlice({
    name: 'meals',
    initialState: initialState,
    reducers: {
        favoriteAdded: favoriteAddedReducer,
        favoriteRemoved: favoriteRemovedReducer,
    },
});

const { favoriteAdded, favoriteRemoved } = slice.actions;

// reducer
export default slice.reducer;

// actions
export const addFavorite = (meal: TMeal) => favoriteAdded(meal);
export const removeFavorite = (meal: TMeal) => favoriteRemoved(meal);

// selectors
export const getFavoritedMeals = createSelector(
    (store: TRootState) => store.features.meals,
    (meals) => meals.ids
);
