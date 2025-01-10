import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '@rneui/themed';

const CustomButton = ({
  onPress,
  width = 100,
  height = 50,
  style,
  children,
  iconPosition = { top: 0, left: 0 }
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { width, height }, style]}
      activeOpacity={0.5}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.iconContainer,
          { top: iconPosition.top, left: iconPosition.left }
        ]}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CustomButton;
