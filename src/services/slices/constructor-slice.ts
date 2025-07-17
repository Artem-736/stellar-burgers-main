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
      state.bun = action.payload;
      return state;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (!Array.isArray(state.ingredients)) {
        state.ingredients = [];
      }

      const ingredientWithId: TConstructorIngredient = {
        ...action.payload,
        id: uuidv4()
      };
      state.ingredients.push(ingredientWithId);
      return state;
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
      return state;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
      return state;
    },
    reorderIngredients(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      const items = state.ingredients || [];
      if (from < 0 || to < 0 || from >= items.length || to >= items.length) {
        return state;
      }
      const updated = [...items];
      const [movedItem] = updated.splice(from, 1);
      updated.splice(to, 0, movedItem);
      state.ingredients = updated;
      return state;
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
