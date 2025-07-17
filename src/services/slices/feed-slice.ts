import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle',
  error: null
};

interface FetchOrdersResponse {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export const fetchOrders = createAsyncThunk<
  FetchOrdersResponse,
  void,
  { rejectValue: string }
>('feed/fetchOrders', async (_, thunkAPI) => {
  try {
    const res = await fetch('https://norma.nomoreparties.space/api/orders/all');
    if (!res.ok) {
      throw new Error('Ошибка загрузки заказов');
    }
    const data = await res.json();
    return {
      orders: data.orders as TOrder[],
      total: data.total,
      totalToday: data.totalToday
    };
  } catch (err) {
    return thunkAPI.rejectWithValue('Ошибка загрузки заказов');
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.status = 'succeeded';
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  }
});

export default feedSlice.reducer;
