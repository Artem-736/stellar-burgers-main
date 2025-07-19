import ingredientsReducer, {
  fetchIngredients
} from '../slices/ingredients-slice';

const initialState = {
  items: [],
  isLoading: false,
  hasError: false
};

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    calories: 420,
    proteins: 80,
    fat: 24,
    carbohydrates: 53
  }
];

describe('ingredientsSlice reducer', () => {
  it('should set isLoading=true on fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('requestId')
    );
    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe(false);
  });

  it('should set items and isLoading=false on fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.fulfilled(mockIngredients, 'requestId')
    );
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('should set hasError=true on fetchIngredients.rejected', () => {
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.rejected(new Error('Error'), 'requestId')
    );
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
});
