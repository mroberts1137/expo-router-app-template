import { makeStyles } from '@rneui/themed';
import { Text, Card, Button } from '@rneui/themed';

export const ThemedText = ({ style, ...props }) => {
  const styles = useStyles();
  return <Text style={[styles.text, style]} {...props} />;
};

export const ThemedCard = ({ style, ...props }) => {
  const styles = useStyles();
  return <Card containerStyle={[styles.card, style]} {...props} />;
};

export const ThemedButton = ({ style, ...props }) => {
  const styles = useStyles();
  return <Button buttonStyle={[styles.button, style]} {...props} />;
};

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.colors.text
  },
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border
  },
  button: {
    backgroundColor: theme.colors.primary
  }
}));
