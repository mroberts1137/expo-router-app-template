import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, AccountType } from '@/types/User';
import { AuthService } from '@/services/AuthService';

interface LoginCredentials {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: string }
>('user/loginUser', async (credentials, thunkAPI) => {
  try {
    const { user, token } = await mockLoginApi(credentials);
    await AuthService.setToken(token);
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string);
  }
});

const mockLoginApi = async (
  credentials: LoginCredentials
): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.username === 'Debug User' &&
        credentials.password === '1234'
      ) {
        const user: User = {
          id: '123',
          username: credentials.username,
          email: 'debug@example.com',
          accountType: AccountType.PREMIUM,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          profile: {
            displayName: 'Debug User',
            avatarUrl: 'https://example.com/avatar.jpg'
          },
          settings: {
            emailNotifications: true,
            theme: 'system'
          },
          subscription: {
            planId: 'premium-monthly',
            validUntil: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
            autoRenew: true
          },
          tokens: {
            count: 3,
            lastReplenishDate: new Date().toISOString(),
            dailyLimit: 5
          }
        };
        const token = 'valid-token';
        resolve({ user, token });
      } else {
        reject('Invalid credentials');
      }
    }, 1000);
  });
};
