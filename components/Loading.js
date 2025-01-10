import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size='large' color='#5637DD' />
      <Text style={styles.loadingText}>Loading . . .</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    color: '#5637DD',
    fontSize: 14,
    fontWeight: 'bold'
  },
  loadingView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export default Loading;
