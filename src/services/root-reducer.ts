import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import constructorReducer from './slices/constructor-slice';
import orderReducer from './slices/order-slice';
import authReducer from './slices/auth-slice';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
