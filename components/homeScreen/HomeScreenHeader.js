import { Image, makeStyles } from '@rneui/themed';
import { ActivityIndicator, View } from 'react-native';
const header_logo = require('../../assets/images/header_logo.png');

const HomeScreenHeader = () => {
  const styles = useStyles();

  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={header_logo}
        PlaceholderContent={<ActivityIndicator />}
        resizeMethod='contain'
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    alignItems: 'center'
  },
  logo: {
    width: 320,
    height: 100
  }
}));

export default HomeScreenHeader;
