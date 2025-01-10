import React from 'react';
import { Card, makeStyles } from '@rneui/themed';
import ThemedText from './ThemedText';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 10,
    backgroundColor: theme.colors.card
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  divider: {
    backgroundColor: theme.colors.border,
    height: 1,
    marginVertical: 10
  },
  elevated: {
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border
  }
}));

const ThemedCard = ({
  title,
  children,
  type = 'default',
  style,
  titleStyle,
  divider = false,
  ...props
}) => {
  const styles = useStyles();

  const cardStyle = [
    styles.card,
    type === 'elevated' && styles.elevated,
    type === 'outlined' && styles.outlined,
    style
  ];

  return (
    <Card containerStyle={cardStyle} {...props}>
      {title && (
        <>
          <ThemedText type='heading' style={[styles.title, titleStyle]}>
            {title}
          </ThemedText>
          {divider && <Card.Divider style={styles.divider} />}
        </>
      )}
      {children}
    </Card>
  );
};

export default ThemedCard;
