import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export const initializeNotifications = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH
    });
  }
};

const generateNotificationMessage = () => {
  return {
    title: 'Notification title! 🔥',
    body: `Notification body!`
  };
};

export const scheduleNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule notification for 8 PM daily
  const trigger = {
    hour: 20,
    minute: 0,
    repeats: true
  };

  const { title, body } = generateNotificationMessage();

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH
    },
    trigger
  });
};
