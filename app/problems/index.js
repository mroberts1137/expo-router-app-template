import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import { useRouter } from 'expo-router';

const categories = [
  { key: 'tsumego', title: 'Tsumego', icon: 'target' },
  { key: 'tesuji', title: 'Tesuji', icon: 'flash' },
  { key: 'shape', title: 'Shape', icon: 'shape' },
  { key: 'opening', title: 'Opening', icon: 'chess-queen' },
  { key: 'sabaki', title: 'Sabaki', icon: 'shield' },
  { key: 'joseki', title: 'Joseki', icon: 'chess-knight' }
];

export default function Problems() {
  const router = useRouter();

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <ListItem onPress={() => router.push(`/problems/${item.key}`)}>
            <Icon type='material-community' name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
      />
    </View>
  );
}

// import { View, StyleSheet } from 'react-native';
// import { Button } from '@rneui/themed';
// import { Link } from 'expo-router';

// const categories = [
//   'tsumego',
//   'tesuji',
//   'shape',
//   'opening',
//   'sabaki',
//   'joseki'
// ];

// export default function ProblemsScreen() {
//   return (
//     <View style={styles.container}>
//       {categories.map((category) => (
//         <Link key={category} href={`/problems/${category}`} asChild>
//           <Button
//             title={category.charAt(0).toUpperCase() + category.slice(1)}
//             style={styles.button}
//           />
//         </Link>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     gap: 16
//   },
//   button: {
//     marginBottom: 8
//   }
// });
