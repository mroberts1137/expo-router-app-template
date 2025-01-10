import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SGFProblem } from '@/types';

const loadSGFFiles = async (category: string): Promise<SGFProblem[]> => {
  try {
    const mockProblems: SGFProblem[] = [
      {
        id: '1',
        filename: 'problem1.sgf',
        difficulty: 'easy',
        description: 'Capture the stone'
      }
    ];
    return mockProblems;
    // Load the SGF files for the specified category
    // const asset = Asset.fromModule(
    //   require(`../assets/sgf/${category}/index.json`)
    // );
    // await asset.downloadAsync();

    // const problems: SGFProblem[] = require(`../assets/sgf/${category}/index.json`);
    // return problems;
  } catch (error) {
    console.error('Error loading SGF files:', error);
    return [];
  }
};

export { loadSGFFiles };
