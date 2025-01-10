import { View } from 'react-native';
import { useTokens } from '@/contexts/TokensContext';
import { Icon, makeStyles } from '@rneui/themed';
import ThemedText from '@/themes/themedComponents/ThemedText';

const TokensIcon = () => {
  const { tokens } = useTokens();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Icon name='coins' type='font-awesome-5' size={24} color='yellow' />
      <ThemedText variant='subheading' style={styles.text}>
        {tokens}
      </ThemedText>
    </View>
  );
};

const useStyles = makeStyles((themed) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 10,
    maxWidth: 100
  },
  text: {
    color: 'yellow',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10
  }
}));

export default TokensIcon;
