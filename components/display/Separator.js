import { makeStyles } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

const Separator = () => {
  const styles = useStyles();

  return <View style={styles.separator} />;
};

const useStyles = makeStyles((theme) => ({
  separator: {
    borderBottomColor: theme.colors.divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8
  }
}));

export default Separator;
