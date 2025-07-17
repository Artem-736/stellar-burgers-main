import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type OrderState = {
  currentOrder: TOrder | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: OrderState = {
  currentOrder: null,
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
          Authorization: token ? `Bearer ${token}` : ''
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

export const { setCurrentOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
