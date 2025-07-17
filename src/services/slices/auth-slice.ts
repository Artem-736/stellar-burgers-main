import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface AuthState {
  user: TUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    {
      email,
      password,
      name
    }: { email: string; password: string; name: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        'https://norma.nomoreparties.space/api/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name })
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || 'Ошибка регистрации');
      }

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      dispatch(setUser(data.user));
      return data.user;
    } catch (error) {
      return rejectWithValue('Ошибка сети');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await fetch('https://norma.nomoreparties.space/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken')
        })
      });

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка при выходе');
    }
  }
);

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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
