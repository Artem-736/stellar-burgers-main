import feedReducer, { fetchOrders } from '../slices/feed-slice';
import { FeedState } from '../slices/feed-slice';

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle',
  error: null
};

const mockOrders = [
  {
    _id: '084706',
    ingredients: [],
    status: 'done',
    name: 'Краторная булка N-200i',
    createdAt: '2025-07-18',
    updatedAt: '2025-07-18',
    number: 84706
  }
];

describe('feedSlice reducer', () => {
  it('should set status=loading on fetchOrders.pending', () => {
    const state = feedReducer(initialState, fetchOrders.pending('requestId'));
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should set orders on fetchOrders.fulfilled', () => {
    const loadingState: FeedState = {
      ...initialState,
      status: 'loading'
    };

    const state = feedReducer(
      loadingState,
      fetchOrders.fulfilled(
        { orders: mockOrders, total: 1, totalToday: 1 },
        'requestId'
      )
    );
    expect(state.status).toBe('succeeded');
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(1);
    expect(state.totalToday).toBe(1);
  });

  it('should set error on fetchOrders.rejected', () => {
    const loadingState: FeedState = {
      ...initialState,
      status: 'loading'
    };

    const state = feedReducer(
      loadingState,
      fetchOrders.rejected(new Error('Error'), 'requestId')
    );
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Неизвестная ошибка');
  });
});
