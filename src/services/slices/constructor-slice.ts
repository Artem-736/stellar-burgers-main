import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type ConstructorState = {
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
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      console.log('addIngredient payload in reducer:', action.payload);
      const ingredientWithId: TConstructorIngredient = {
        ...action.payload,
        id: uuidv4()
      };
      state.ingredients.push(ingredientWithId);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
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
        console.warn('Invalid reorder indices', { from, to });
        return;
      }
      const updated = [...state.ingredients];
      const [movedItem] = updated.splice(from, 1);
      updated.splice(to, 0, movedItem);
      state.ingredients = updated;
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
