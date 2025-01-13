import { Switch } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '@/store/settingsSlice';

const ToggleTheme = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.settings.darkMode);

  const toggleTheme = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return <Switch value={darkMode} onValueChange={toggleTheme} />;
};

export default ToggleTheme;
