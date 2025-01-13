import { Switch } from '@rneui/themed';
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleNotifications } from '@/services/NotificationService';

const ToggleNotifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const enabled = await AsyncStorage.getItem('notificationsEnabled');
      setNotificationsEnabled(enabled === 'true');
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const handleToggleNotifications = async (value) => {
    try {
      if (value) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Please enable notifications in your device settings to receive reminders.'
          );
          return;
        }
      }

      await AsyncStorage.setItem('notificationsEnabled', value.toString());
      setNotificationsEnabled(value);

      if (value) {
        scheduleNotifications();
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
    } catch (error) {
      console.error('Error toggling notifications:', error);
    }
  };

  return (
    <Switch
      value={notificationsEnabled}
      onValueChange={handleToggleNotifications}
    />
  );
};

export default ToggleNotifications;
