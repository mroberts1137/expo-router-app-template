import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles } from '@rneui/themed';
import { Platform, View } from 'react-native';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
}));

const ThemedScreen = ({ children, style, ...props }) => {
  const styles = useStyles();

  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={[styles.container, style]} {...props}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

export default ThemedScreen;
