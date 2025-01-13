import { Icon, useTheme } from '@rneui/themed';
import { StyleSheet } from 'react-native';

export const DrawerIcon = (props) => {
  const { theme } = useTheme();

  return (
    <Icon
      name='menu'
      type='material'
      size={theme.spacing.lg}
      color={theme.colors.text}
      iconStyle={styles.headerIcon}
      {...props}
    />
  );
};

export const ThemedIcon = ({
  name,
  type = 'font-awesome',
  color,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <Icon
      name={name}
      type={type}
      size={theme.spacing.lg}
      iconStyle={{ width: 24 }}
      color={color || theme.colors.text}
      {...props}
    />
  );
};

export const BackIcon = (props) => {
  const { theme } = useTheme();

  return (
    <Icon
      name='arrow-back'
      type='material'
      size={theme.spacing.lg}
      color={theme.colors.text}
      iconStyle={styles.headerIcon}
      {...props}
    />
  );
};

export const PlusIcon = (props) => {
  const { theme } = useTheme();

  return (
    <Icon
      name='plus'
      type='entypo'
      size={30}
      color={theme.colors.text}
      iconStyle={styles.plusIcon}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    marginLeft: 10
  },
  plusIcon: {
    marginRight: 15
  }
});
