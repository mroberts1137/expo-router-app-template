import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, User } from '@/types/User';
import { loginUser } from './userActions';

const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.isLoading = false;
      state.error = null;
    },

    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
      }
    },

    addTokens: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.tokens.count += action.payload;
      }
    },

    consumeToken: (state) => {
      if (state.userInfo && state.userInfo.tokens.count > 0) {
        state.userInfo.tokens.count -= 1;
      }
    },

    replenishDailyTokens: (state) => {
      if (state.userInfo) {
        const today = new Date().toISOString().split('T')[0];
        const lastReplenish =
          state.userInfo.tokens.lastReplenishDate.split('T')[0];

        if (today !== lastReplenish) {
          state.userInfo.tokens = {
            ...state.userInfo.tokens,
            count: state.userInfo.tokens.dailyLimit,
            lastReplenishDate: new Date().toISOString()
          };
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
        state.userInfo = action.payload;
        // Check for daily replenishment on login
        const today = new Date().toISOString().split('T')[0];
        const lastReplenish =
          action.payload.tokens.lastReplenishDate.split('T')[0];
        if (today !== lastReplenish) {
          state.userInfo.tokens = {
            ...action.payload.tokens,
            count: action.payload.tokens.dailyLimit,
            lastReplenishDate: new Date().toISOString()
          };
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout, addTokens, consumeToken, replenishDailyTokens } =
  userSlice.actions;
export default userSlice.reducer;
