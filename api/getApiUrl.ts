import { Platform } from 'react-native';

const getDevelopmentApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000/api'; // android emulator recognizes 10.0.2.2 as localhost
  }
  return 'http://localhost:5000/api';
};

export const getApiUrl = () => {
  if (__DEV__) {
    return getDevelopmentApiUrl();
  }
  return 'https://your-production-url.com/api';
};
