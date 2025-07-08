import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import constructorReducer from './slices/constructor-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer
});
