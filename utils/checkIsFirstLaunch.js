import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_LAUNCH_KEY = 'isFirstLaunch';

export const checkIsFirstLaunch = async () => {
  try {
    const isFirstLaunch = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);

    if (isFirstLaunch === null) {
      // First launch, set the flag
      await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'false');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking first launch:', error);
    return false;
  }
};
