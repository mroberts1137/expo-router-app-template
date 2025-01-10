import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ThemedScreen from '@/themes/themedComponents/ThemedScreen';
import Footer from '@/components/Footer';
import HomeScreenHeader from '@/components/homeScreen/HomeScreenHeader';
import { Link } from 'expo-router';
import { Button } from '@rneui/themed';

export default function HomeScreen() {
  return (
    <ThemedScreen>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* App Header */}
        <HomeScreenHeader />
        <View style={styles.container}>
          <Link href='/problems' asChild>
            <Button title='Problems' />
          </Link>
          <Link href='/settings' asChild>
            <Button title='Settings' />
          </Link>
          <Link href='/about' asChild>
            <Button title='About' />
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
    gap: 16
  }
});
