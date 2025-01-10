import { View, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

const CustomCard = ({ children, style, ...props }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.containerStyle, style]} {...props}>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  containerStyle: {
    alignItems: 'center',
    borderRadius: 10,
    height: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%'
  }
});

export default CustomCard;
