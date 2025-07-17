import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      return {
        ...state,
        bun: action.payload
      };
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredientWithId: TConstructorIngredient = {
        ...action.payload,
        uniqueId: uuidv4()
      };
      return {
        ...state,
        ingredients: [...(state.ingredients ?? []), ingredientWithId]
      };
    },
    removeIngredient(state, action: PayloadAction<string>) {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.uniqueId !== action.payload
        )
      };
    },
    clearConstructor() {
      return {
        bun: null,
        ingredients: []
      };
    },
    reorderIngredients(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      if (
        from < 0 ||
        to < 0 ||
        from >= state.ingredients.length ||
        to >= state.ingredients.length
      ) {
        return state;
      }
      const updated = [...state.ingredients];
      const [movedItem] = updated.splice(from, 1);
      updated.splice(to, 0, movedItem);
      return {
        ...state,
        ingredients: updated
      };
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  reorderIngredients
} = constructorSlice.actions;

export default constructorSlice.reducer;
