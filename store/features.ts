import { combineReducers } from '@reduxjs/toolkit';
import mealsReducer from './meals';

const reducer = combineReducers({
    meals: mealsReducer,
});

export default reducer;
