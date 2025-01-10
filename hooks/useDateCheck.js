import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  areDifferentDays,
  getDateString,
  getDaysDifference
} from '@/utils/dateUtils';

const STORAGE_KEY = 'LAST_APP_ACCESS_DATE';

export const useDateCheck = () => {
  const checkIntervalRef = useRef(null);

  const checkDate = async () => {
    const currentDate = getDateString();
    const storedDate = await AsyncStorage.getItem(STORAGE_KEY);
    const daysPassed = getDaysDifference(storedDate, currentDate);

    console.log(
      `Current Date: ${currentDate}, Stored Date: ${storedDate}, Days Passed: ${daysPassed}`
    );

    if (!storedDate) {
      // First time app is used
      await AsyncStorage.setItem(STORAGE_KEY, currentDate);
      return;
    }

    if (areDifferentDays(storedDate, currentDate)) {
      // Update stored date
      await AsyncStorage.setItem(STORAGE_KEY, currentDate);
    }
  };

  useEffect(() => {
    // Check date when component mounts
    checkDate();

    // Set up hourly check
    const CHECK_INTERVAL = __DEV__ ? 60 * 1 * 1000 : 60 * 1 * 1000; // 1 min in dev, 1 hour in prod
    checkIntervalRef.current = setInterval(checkDate, CHECK_INTERVAL);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, []);

  return null;
};
