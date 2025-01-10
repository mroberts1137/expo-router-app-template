import React from 'react';
import { Button, makeStyles, useTheme } from '@rneui/themed';

const useStyles = makeStyles((theme) => ({
  primary: {
    backgroundColor: theme.colors.primary
  },
  secondary: {
    backgroundColor: theme.colors.secondary
  },
  success: {
    backgroundColor: theme.colors.success
  },
  error: {
    backgroundColor: theme.colors.error
  },
  disabled: {
    backgroundColor: theme.colors.disabled
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary
  },
  gradient: {
    // This will be handled separately
  },
  containerStyle: {
    borderRadius: 8,
    margin: 5
  },
  titleStyle: {
    fontWeight: 'bold'
  },
  outlineTitle: {
    color: theme.colors.primary
  }
}));

const ThemedButton = ({
  type = 'primary',
  title,
  containerStyle,
  buttonStyle,
  titleStyle,
  ...props
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const getButtonProps = () => {
    switch (type) {
      case 'gradient':
        return {
          ViewComponent: require('@rneui/themed').LinearGradient,
          linearGradientProps: {
            colors: [theme.colors.buttonTop, theme.colors.buttonBottom]
          }
        };
      case 'outline':
        return {
          type: 'outline',
          titleStyle: [styles.titleStyle, styles.outlineTitle, titleStyle]
        };
      default:
        return {
          buttonStyle: [styles[type], buttonStyle],
          titleStyle: [styles.titleStyle, titleStyle]
        };
    }
  };

  return (
    <Button
      title={title}
      containerStyle={[styles.containerStyle, containerStyle]}
      {...getButtonProps()}
      {...props}
    />
  );
};

export default ThemedButton;
