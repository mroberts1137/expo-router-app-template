import { persistor, store } from '@/store/store';
import { Tabs } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from '@/components/Loading';
import ThemeWrapper from '@/themes/ThemeWrapper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ThemeWrapper>
          <SafeAreaProvider>
            <Tabs>
              <Tabs.Screen
                name='index'
                options={{
                  title: 'Home',
                  tabBarIcon: ({ color }) => (
                    <Icon type='material-community' name='home' color={color} />
                  )
                }}
              />
              <Tabs.Screen
                name='settings'
                options={{
                  title: 'Settings',
                  tabBarIcon: ({ color }) => (
                    <Icon type='material-community' name='cog' color={color} />
                  )
                }}
              />
              <Tabs.Screen
                name='about'
                options={{
                  title: 'About',
                  tabBarIcon: ({ color }) => (
                    <Icon type='material-community' name='cog' color={color} />
                  )
                }}
              />
            </Tabs>
          </SafeAreaProvider>
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
}
