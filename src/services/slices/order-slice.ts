import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type OrderState = {
  currentOrder: TOrder | null;
  orderHistory: TOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: OrderState = {
  currentOrder: null,
  orderHistory: [],
  status: 'idle',
  error: null
};

export const sendOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/sendOrder', async (ingredientIds, thunkAPI) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(
      'https://norma.nomoreparties.space/api/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? token : ''
        },
        body: JSON.stringify({ ingredients: ingredientIds })
      }
    );

    if (!response.ok) {
      throw new Error('Ошибка при отправке заказа');
    }

    const data = await response.json();
    return data.order as TOrder;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка отправки заказа');
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<TOrder>) {
      state.currentOrder = action.payload;
    },
    clearOrder(state) {
      state.currentOrder = null;
    },
    setOrderHistory(state, action: PayloadAction<TOrder[]>) {
      state.orderHistory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      });
  }
});

export const fetchOrderHistory = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('order/fetchOrderHistory', async (_, thunkAPI) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return thunkAPI.rejectWithValue('Токен не найден');
  }
  try {
    const res = await fetch(
      'https://norma.nomoreparties.space/api/orders/all',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (!res.ok) throw new Error('Ошибка при загрузке заказов');
    const data = await res.json();
    return data.orders as TOrder[];
  } catch {
    return thunkAPI.rejectWithValue('Ошибка загрузки истории заказов');
  }
});

export const { setCurrentOrder, clearOrder, setOrderHistory } =
  orderSlice.actions;
export default orderSlice.reducer;
