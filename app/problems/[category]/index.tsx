import { View, FlatList, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { useLocalSearchParams, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { loadSGFFiles } from '@/utils/sgf-loader';
import { SGFProblem } from '@/types';

export default function ProblemListScreen() {
  const { category } = useLocalSearchParams();
  const [problems, setProblems] = useState<SGFProblem[]>([]);

  useEffect(() => {
    const loadProblems = async () => {
      const problemList: SGFProblem[] = await loadSGFFiles(category as string);
      setProblems(problemList);
    };
    loadProblems();
  }, [category]);

  return (
    <View style={styles.container}>
      <FlatList
        data={problems}
        renderItem={({ item }) => (
          <Link href={`/problems/${category}/${item.id}`} asChild>
            <Button title={`Problem ${item.id}`} style={styles.button} />
          </Link>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  button: {
    marginBottom: 8
  }
});
