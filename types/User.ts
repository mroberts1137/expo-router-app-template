export enum AccountType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  email: string;
  accountType: AccountType;
  createdAt: string;
  lastLogin: string;
  profile: {
    displayName?: string;
    avatarUrl?: string;
  };
  settings: {
    emailNotifications: boolean;
    theme: 'light' | 'dark' | 'system';
  };
  subscription?: {
    planId: string;
    validUntil: string;
    autoRenew: boolean;
  };
  tokens: {
    count: number;
    lastReplenishDate: string;
    dailyLimit: number;
  };
}

export interface UserState {
  userInfo: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}
