import * as SecureStore from 'expo-secure-store';

export class AuthService {
  private static readonly TOKEN_KEY = 'auth_token';

  static async setToken(token: string) {
    await SecureStore.setItemAsync(this.TOKEN_KEY, token);
  }

  static async getToken() {
    return await SecureStore.getItemAsync(this.TOKEN_KEY);
  }

  static async removeToken() {
    await SecureStore.deleteItemAsync(this.TOKEN_KEY);
  }
}
