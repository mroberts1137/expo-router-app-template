import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ThemedScreen from '@/themes/themedComponents/ThemedScreen';
import Footer from '@/components/Footer';
import HomeScreenHeader from '@/components/homeScreen/HomeScreenHeader';
import { Link } from 'expo-router';
import { Button, Text } from '@rneui/themed';

export default function HomeScreen() {
  return (
    <ThemedScreen>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* App Header */}
        <HomeScreenHeader />
        <View style={styles.container}>
          <Text h1 style={{ marginBottom: 20 }}>
            Go Alchemy
          </Text>
          <Text style={{ marginBottom: 20 }}>
            Welcome to your Go Problems training app!
          </Text>
          <Link href='/problems' asChild>
            <Button title='Problems' style={{ width: 200 }} />
          </Link>
        </View>
        <Footer />
      </ScrollView>
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 10
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
