import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type OrderState = {
  currentOrder: TOrder | null;
};

const initialState: OrderState = {
  currentOrder: null
};

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
  }
});

export const { setCurrentOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
