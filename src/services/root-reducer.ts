import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import constructorReducer from './slices/constructor-slice';
import orderReducer from './slices/order-slice';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  constructor: constructorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
