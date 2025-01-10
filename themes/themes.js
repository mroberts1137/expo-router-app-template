import { createTheme } from '@rneui/themed';

const lightColors = {
  primary: '#3477db',
  secondary: '#edd4d5',
  success: '#2ecc71',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#1abc9c',
  light: '#ecf0f1',
  dark: '#2c3e50',
  background: '#F4F4F4',
  kiwi: '#4F2',
  darkKiwi: '#2D1',
  cardTop: '#4F2',
  cardBottom: '#488',
  buttonTop: '#F4F',
  buttonBottom: '#33C',
  surface: '#EFEFEF',
  text: '#0A0A0A',
  textSecondary: '#666',
  error: '#B00020',
  card: '#FDFDFD',
  border: '#e0e0e0',
  disabled: '#999'
};

const darkColors = {
  primary: '#2c3e50',
  secondary: '#283848',
  success: '#1abc9c',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#2ecc71',
  light: '#2c3e50',
  dark: '#ecf0f1',
  background: '#222',
  kiwi: '#2B2',
  darkKiwi: '#191',
  cardTop: '#4F2',
  cardBottom: '#488',
  buttonTop: '#F4F',
  buttonBottom: '#33C',
  surface: '#1e1e1e',
  text: '#efefef',
  textSecondary: '#b0b0b0',
  error: '#CF6679',
  card: '#303030',
  border: '#404040',
  disabled: '#757575'
};

export const theme = createTheme({
  lightColors,
  darkColors,
  mode: 'light' | 'dark',
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    body: {
      fontSize: 16
    },
    caption: {
      fontSize: 14
    },
    button: {
      fontSize: 16,
      fontWeight: '600'
    }
  },
  components: {
    Card: (props, theme) => ({
      containerStyle: {
        borderRadius: 8,
        padding: 16,
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border
      }
    }),
    Text: (props, theme) => ({
      style: {
        color: props.secondary ? theme.colors.textSecondary : theme.colors.text
      },
      h1Style: {
        ...theme.typography.h1
      },
      h2Style: {
        ...theme.typography.h2
      },
      h3Style: {
        ...theme.typography.h3
      }
    }),
    Button: (props, theme) => ({
      raised: true,
      containerStyle: {
        borderRadius: 8,
        overflow: 'hidden' // Necessary for gradient to work properly
      },
      buttonStyle: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20
      },
      titleStyle: {
        ...theme.typography.button
      }
    })
  }
});
