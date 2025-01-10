import { Ionicons } from '@expo/vector-icons';
import { makeStyles, useTheme } from '@rneui/themed';
import { Text, TouchableOpacity } from 'react-native';

const IconButton = ({ icon, title, onPress }) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={24} color={theme.colors.text} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.button,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10
  }
}));

export default IconButton;
