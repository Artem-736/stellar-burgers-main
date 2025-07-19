import orderReducer, { sendOrder } from '../slices/order-slice';
import { OrderState } from '../slices/order-slice';

const initialState: OrderState = {
  currentOrder: null,
  orderHistory: [],
  status: 'idle',
  error: null
};

const mockOrder = {
  _id: '084706',
  ingredients: [],
  status: 'done',
  name: 'Краторная булка N-200i',
  createdAt: '2025-07-18',
  updatedAt: '2025-07-18',
  number: 84706
};

describe('orderSlice reducer', () => {
  it('should set status=loading on sendOrder.pending', () => {
    const state = orderReducer(
      initialState,
      sendOrder.pending('requestId', [])
    );
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should set currentOrder on sendOrder.fulfilled', () => {
    const loadingState: OrderState = {
      ...initialState,
      status: 'loading'
    };

    const state = orderReducer(
      loadingState,
      sendOrder.fulfilled(mockOrder, 'requestId', [])
    );
    expect(state.status).toBe('succeeded');
    expect(state.currentOrder).toEqual(mockOrder);
  });

  it('should set error on sendOrder.rejected', () => {
    const loadingState: OrderState = {
      ...initialState,
      status: 'loading'
    };

    const state = orderReducer(
      loadingState,
      sendOrder.rejected(new Error('Error'), 'requestId', [])
    );
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Unknown error');
  });
});
