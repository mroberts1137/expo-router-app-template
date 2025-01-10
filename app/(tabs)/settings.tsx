import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Switch, ListItem, Button } from '@rneui/themed';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleNotifications } from '@/services/NotificationService';
import ToggleTheme from '@/components/ToggleTheme';
import { useDispatch, useSelector } from 'react-redux';
import { resetSettings, toggleSfx } from '@/store/settingsSlice';
import ThemedScreen from '@/themes/themedComponents/ThemedScreen';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const dispatch = useDispatch();
  const sfxEnabled = useSelector((state) => state.settings?.sfxEnabled ?? true);

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
    <ThemedScreen>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Notifications</ListItem.Title>
          <ListItem.Subtitle>Receive notifications</ListItem.Subtitle>
        </ListItem.Content>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleToggleNotifications}
        />
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Dark Mode</ListItem.Title>
        </ListItem.Content>
        <ToggleTheme />
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Sound Effects</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={sfxEnabled}
          onValueChange={() => dispatch(toggleSfx())}
        />
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Reset settings to default</ListItem.Title>
        </ListItem.Content>
        <Button title='Reset' onPress={() => dispatch(resetSettings())} />
      </ListItem>
    </ThemedScreen>
  );
};

export default SettingsScreen;
