import { View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { Link } from 'expo-router';

const categories = [
  'tsumego',
  'tesuji',
  'shape',
  'opening',
  'sabaki',
  'joseki'
];

export default function ProblemsScreen() {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <Link key={category} href={`/problems/${category}`} asChild>
          <Button
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            style={styles.button}
          />
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16
  },
  button: {
    marginBottom: 8
  }
});
