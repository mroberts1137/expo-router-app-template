import React from 'react';
import { View, Text, Image, Linking, ScrollView } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { Button } from '@rneui/base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ThemedScreen from '@/themes/themedComponents/ThemedScreen';
const logo = require('@/assets/images/screen_logo.png');

const AboutScreen = () => {
  const styles = useStyles();

  const handleWebsitePress = () => {
    Linking.openURL('https://yourcompany.com');
  };

  const handleSupportPress = () => {
    Linking.openURL(process.env.EXPO_PUBLIC_COMPANY_EMAIL);
  };

  return (
    <ThemedScreen>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />
          <Text style={styles.appName}>
            {Constants?.expoConfig?.name || 'App Name'}
          </Text>
          <Text style={styles.version}>
            Version {Constants?.expoConfig?.version || '1.0.0'}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.description}>
            {Constants?.expoConfig?.description || 'App description'}
          </Text>

          <View style={styles.divider} />

          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              {Constants?.expoConfig?.extra?.companyName}
            </Text>
            <Text style={styles.companyDetails}>
              © {new Date().getFullYear()} All rights reserved
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              title='Visit Website'
              icon={
                <MaterialCommunityIcons
                  name='web'
                  size={20}
                  color='white'
                  style={styles.buttonIcon}
                />
              }
              onPress={handleWebsitePress}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
            />

            <Button
              title='Contact'
              icon={
                <MaterialCommunityIcons
                  name='email'
                  size={20}
                  color='white'
                  style={styles.buttonIcon}
                />
              }
              onPress={handleSupportPress}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </ThemedScreen>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32
  },
  logo: {
    width: 200,
    height: 200,
    marginVertical: 16
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8
  },
  version: {
    fontSize: 16,
    color: theme.colors.grey3
  },
  infoContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: theme.colors.grey5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  description: {
    fontSize: 16,
    color: theme.colors.grey1,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 12
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.grey5,
    marginVertical: 24
  },
  companyInfo: {
    alignItems: 'center',
    marginBottom: 24
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.grey1,
    marginBottom: 8
  },
  companyDetails: {
    fontSize: 14,
    color: theme.colors.grey3
  },
  buttonsContainer: {
    gap: 12
  },
  buttonContainer: {
    borderRadius: 8
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12
  },
  buttonIcon: {
    marginRight: 8
  }
}));

export default AboutScreen;
