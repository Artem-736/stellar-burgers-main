import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from './root-reducer';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'constructor/addIngredient',
          'constructor/reorderIngredients',
          'ingredients/fetchIngredients/pending',
          'ingredients/fetchIngredients/fulfilled',
          'auth/setUser',
          'order/setOrderHistory'
        ],
        ignoredPaths: ['constructor.ingredients']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
