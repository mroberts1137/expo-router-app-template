import { View, Text, StyleSheet } from 'react-native';
import {
  CustomCard,
  CustomButton,
  CustomText
} from '@/components/customComponents/customComponents';

const UserProfile = ({ user, navigation }) => {
  // Display login button if user is not logged in
  if (!user || !user.isLoggedIn) {
    return (
      <View style={styles.container}>
        <CustomCard
          title='Profile'
          colors={['#8070A0', '#600080']}
          style={styles.customCard}
        >
          <CustomButton
            title='Login'
            onPress={() => navigation.navigate('Login')}
          />
        </CustomCard>
      </View>
    );
  }

  // Display User Profile if user is logged in
  return (
    <View style={styles.container}>
      <CustomCard
        title='Profile'
        colors={['#8070A0', '#600080']}
        style={styles.customCard}
      >
        <View style={styles.profileFields}>
          <CustomText style={styles.profileText}>
            Username: {user?.userInfo?.username}
          </CustomText>
          <CustomText style={styles.profileText}>
            Password: {user?.userInfo?.password}
          </CustomText>
          <CustomText style={styles.profileText}>
            Email: {user?.userInfo?.email}
          </CustomText>
        </View>
      </CustomCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },
  customCard: {
    alignItems: 'left',
    height: 100,
    width: '90%'
  },
  profileFields: {
    alignItems: 'left',
    justifyContent: 'start'
  },
  profileText: {
    color: 'white',
    fontSize: 20
  }
});

export default UserProfile;
