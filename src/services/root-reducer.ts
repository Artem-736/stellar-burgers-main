import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer
});
