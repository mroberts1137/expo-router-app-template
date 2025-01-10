import { Alert } from 'react-native';
import { useTokens } from '@/contexts/TokensContext';

export const useTokenConsumer = () => {
  const { tokens, consumeToken, earnTokens } = useTokens();

  const createTokenConsumer = () => {
    return (callback) => () => {
      if (consumeToken()) {
        console.log(`Consumed one token: ${tokens} remaining`);
        callback();
      } else {
        Alert.alert(
          'No Tokens Available',
          'You need tokens to play. Would you like to watch an ad to earn more tokens?',
          [
            {
              text: 'No Thanks',
              style: 'cancel'
            },
            {
              text: 'Watch Ad',
              onPress: () => {
                earnTokens();
              }
            }
          ]
        );
      }
    };
  };

  const tokenConsumer = createTokenConsumer();

  return tokenConsumer;
};
