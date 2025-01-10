import { makeStyles, Text } from '@rneui/themed';
import { View } from 'react-native';
import { version } from '@/package.json';

const Footer = () => {
  const styles = useStyles();

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{`Kiwi Cards v${version}`}</Text>
      <Text style={styles.footerText}>
        © {new Date().getFullYear()} All rights reserved
      </Text>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    height: 80,
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.card
  },
  footerText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5
  }
}));

export default Footer;
