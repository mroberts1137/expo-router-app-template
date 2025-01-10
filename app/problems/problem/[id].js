import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';

export default function GoBoard() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text h2>Problem {id}</Text>
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#DCB35C',
          marginVertical: 20,
          borderWidth: 1,
          borderColor: 'black'
        }}
      />
      <Button title='Check Solution' />
    </View>
  );
}
