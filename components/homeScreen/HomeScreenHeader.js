import { Image, makeStyles } from '@rneui/themed';
import { ActivityIndicator, View } from 'react-native';

const HomeScreenHeader = () => {
  const styles = useStyles();

  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/header_logo.png')}
        PlaceholderContent={<ActivityIndicator />}
        resizeMethod='contain'
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    alignItems: 'center'
    // width: '100%',
    // height: 100,
    // borderColor: 'black',
    // borderWidth: 1,
    // backgroundColor: 'lightgray'
  },
  logo: {
    width: 320,
    height: 100
  }
}));

export default HomeScreenHeader;
