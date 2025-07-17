import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface AuthState {
  user: TUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
