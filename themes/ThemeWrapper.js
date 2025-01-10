import { useSelector } from 'react-redux';
import { theme } from './themes';
import { createTheme, ThemeProvider } from '@rneui/themed';

const ThemeWrapper = ({ children }) => {
  const darkMode = useSelector((state) => state.settings.darkMode);

  const appTheme = createTheme({
    ...theme,
    mode: darkMode ? 'dark' : 'light'
  });

  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
