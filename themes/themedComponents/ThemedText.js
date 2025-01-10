import React from 'react';
import { Text, makeStyles } from '@rneui/themed';

const useStyles = makeStyles((theme) => ({
  default: {
    color: theme.colors.text,
    fontSize: 16
  },
  secondary: {
    color: theme.colors.textSecondary,
    fontSize: 16
  },
  heading1: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: 'bold'
  },
  heading2: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold'
  },
  heading3: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: 'bold'
  },
  subheading: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '600'
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: 14
  },
  error: {
    color: theme.colors.error,
    fontSize: 14
  },
  success: {
    color: theme.colors.success,
    fontSize: 14
  },
  button: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
}));

const ThemedText = ({ type = 'default', style, children, ...props }) => {
  const styles = useStyles();
  return (
    <Text style={[styles[type], style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
