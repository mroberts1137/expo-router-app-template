import { persistor, store } from '@/store/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from '@/components/Loading';
import ThemeWrapper from '@/themes/ThemeWrapper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ThemeWrapper>
          <SafeAreaProvider>
            <Stack />
          </SafeAreaProvider>
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
}
