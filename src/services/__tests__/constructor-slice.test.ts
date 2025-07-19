import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  reorderIngredients
} from '../slices/constructor-slice';
import { TIngredient } from '@utils-types';

const initialState = {
  bun: null,
  ingredients: []
};

const mockBun: TIngredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  price: 100,
  image: '',
  image_mobile: '',
  image_large: '',
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0
};

const mockIngredient: TIngredient = {
  _id: '2',
  name: 'Котлета',
  type: 'main',
  price: 50,
  image: '',
  image_mobile: '',
  image_large: '',
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0
};

describe('constructorSlice reducer', () => {
  it('should handle addBun', () => {
    const state = constructorReducer(initialState, addBun(mockBun));
    expect(state.bun).toEqual(mockBun);
  });

  it('should handle addIngredient', () => {
    const state = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredient,
      uniqueId: expect.any(String)
    });
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredient = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    const ingredientId = stateWithIngredient.ingredients[0].uniqueId;
    const state = constructorReducer(
      stateWithIngredient,
      removeIngredient(ingredientId)
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle reorderIngredients', () => {
    const firstIngredient = { ...mockIngredient, uniqueId: '1' };
    const secondIngredient = { ...mockIngredient, uniqueId: '2', name: 'Сыр' };

    const stateWithIngredients = {
      ...initialState,
      ingredients: [firstIngredient, secondIngredient]
    };

    const state = constructorReducer(
      stateWithIngredients,
      reorderIngredients({ from: 0, to: 1 })
    );

    expect(state.ingredients[0].name).toBe('Сыр');
    expect(state.ingredients[1].name).toBe('Котлета');
  });
});
