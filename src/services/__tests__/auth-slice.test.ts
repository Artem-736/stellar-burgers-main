import authReducer, { registerUser } from '../slices/auth-slice';

const initialState = {
  user: null,
  isAuthenticated: false
};

const mockUser = {
  name: 'test',
  email: 'test@test.com'
};

describe('authSlice reducer', () => {
  it('should set user on registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      user: mockUser,
      isAuthenticated: true
    });
  });

  it('should handle registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Error message'
    };

    const state = authReducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
