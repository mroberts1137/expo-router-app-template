import { Text, View } from 'react-native';
import TokensIcon from '../tokens/TokensIcon';
import { makeStyles } from '@rneui/themed';

const UserPanel = ({ user }) => {
  const styles = useStyles();

  if (!user) return null;

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.tagline}>{`Welcome back, ${user?.username}!`}</Text>
      <TokensIcon />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  tagline: {
    color: '#5f6368',
    fontSize: 16,
    marginTop: 5
  }
}));

export default UserPanel;
