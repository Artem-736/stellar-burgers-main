import { rootReducer } from '../root-reducer';
import { AnyAction } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('should return initial state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    
    const initialState = rootReducer(undefined, {} as AnyAction);
    
    const newState = rootReducer(initialState, unknownAction);
    
    expect(newState).toEqual(initialState);
  });

  it('should initialize with correct structure', () => {
    const initialState = rootReducer(undefined, {} as AnyAction);

    const expectedKeys = [
      'auth',
      'burgerConstructor',
      'feed',
      'ingredients',
      'order'
    ];
    expectedKeys.forEach((key) => {
      expect(initialState).toHaveProperty(key);
    });

    expect(initialState.auth).toEqual({
      user: null,
      isAuthenticated: false
    });

    expect(initialState.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(initialState.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: 'idle',
      error: null
    });

    expect(initialState.ingredients).toEqual({
      items: [],
      isLoading: false,
      hasError: false
    });

    expect(initialState.order).toEqual({
      currentOrder: null,
      orderHistory: [],
      status: 'idle',
      error: null
    });
  });
});