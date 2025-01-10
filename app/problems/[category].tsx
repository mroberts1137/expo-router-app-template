import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Text } from '@rneui/themed';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Mock data: In a real app, this would come from your SGF files
const mockProblems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Problem ${i + 1}`
}));

export default function ProblemList() {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  return (
    <View>
      <FlatList
        data={mockProblems}
        renderItem={({ item }) => (
          <ListItem onPress={() => router.push(`/problems/problem/${item.id}`)}>
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

// import { View, FlatList, StyleSheet } from 'react-native';
// import { Button, Text } from '@rneui/themed';
// import { useLocalSearchParams, Link } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { loadSGFFiles } from '@/utils/sgf-loader';
// import { SGFProblem } from '@/types';

// export default function ProblemListScreen() {
//   const { category } = useLocalSearchParams();
//   const [problems, setProblems] = useState<SGFProblem[]>([]);

//   useEffect(() => {
//     const loadProblems = async () => {
//       const problemList: SGFProblem[] = await loadSGFFiles(category as string);
//       setProblems(problemList);
//     };
//     loadProblems();
//   }, [category]);

//   return (
//     <View style={styles.container}>
//       <Text>{category}</Text>
//       <FlatList
//         data={problems}
//         renderItem={({ item }) => (
//           <Link href={`/problems/${category}/${item.id}`} asChild>
//             <Button title={`Problem ${item.id}`} style={styles.button} />
//           </Link>
//         )}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16
//   },
//   button: {
//     marginBottom: 8
//   }
// });
