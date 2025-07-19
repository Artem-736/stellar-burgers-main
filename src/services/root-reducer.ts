import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import constructorReducer from './slices/constructor-slice';
import orderReducer from './slices/order-slice';
import authReducer from './slices/auth-slice';
import feedReducer from './slices/feed-slice';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  auth: authReducer,
  feed: feedReducer
});

export type RootState = ReturnType<typeof rootReducer>;
