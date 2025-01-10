import { Icon } from '@rneui/themed';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Checkbox = ({ label, value, onValueChange }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onValueChange}>
    <Icon
      name={value ? 'check-box' : 'check-box-outline-blank'}
      size={24}
      color={value ? '#ff6b6b' : '#757575'}
    />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16
  }
});

export default Checkbox;
