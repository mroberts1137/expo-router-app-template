import React from 'react';
import { Stack } from 'expo-router';

export default function ProblemsLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Problem Categories' }} />
      <Stack.Screen
        name='[category]'
        options={({ route }) => ({
          title: `${
            route.params.category.charAt(0).toUpperCase() +
            route.params.category.slice(1)
          } Problems`
        })}
      />
      <Stack.Screen name='problem/[id]' options={{ title: 'Go Board' }} />
    </Stack>
  );
}
