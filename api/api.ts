import axios, { AxiosError } from 'axios';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  startAfter,
  orderBy,
  limit as limitFunc
} from 'firebase/firestore';
import { getDb } from '@/firebase';
import { DbFlashcardSet } from '@/types';
import { getApiUrl } from './getApiUrl';
import { AuthService } from '@/services/AuthService';

type SearchPayload = {
  category: string | null;
  searchTerm: string | null;
};

const API_URL = getApiUrl();

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const token = await AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const uploadFlashcardSet = async (flashcardSet: DbFlashcardSet) => {
  console.log(`Uploading ${flashcardSet.name} to ${API_URL}/upload`);
  try {
    // Check for existing set in db first
    const db = getDb();
    const coll = collection(db, 'flashcardSets');
    const q = query(coll, where('name', '==', flashcardSet.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error('A flashcard set with this name already exists');
    }

    const response = await api.post('/upload', flashcardSet);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(axiosError.response.data.error || 'Upload failed');
      } else if (axiosError.request) {
        // The request was made but no response was received
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up the request');
      }
    } else if (error instanceof Error) {
      if (error.message === 'TIMEOUT') {
        throw new Error('Upload request timed out');
      } else {
        throw error; // Re-throw the original error
      }
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const fetchSets = async ({
  category = null,
  searchTerm = '',
  lastDoc = null,
  limit = 10
}: SearchPayload & { lastDoc?: any; limit?: number }): Promise<{
  sets: DbFlashcardSet[];
  lastDoc: any;
  hasMore: boolean;
}> => {
  try {
    const db = getDb();
    const coll = collection(db, 'flashcardSets');

    // Start with a basic query
    let constraints: any[] = [limitFunc(limit)];

    // Add category filter if provided
    if (category) {
      const lowercaseCategory = category.toLowerCase();
      constraints.push(where('tags', 'array-contains', lowercaseCategory));
    }

    // Add ordering
    constraints.push(orderBy('name', 'asc'));

    // Add startAfter if we have a lastDoc
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    // Apply all constraints
    const q = query(coll, ...constraints);

    const querySnapshot = await getDocs(q);

    let sets: DbFlashcardSet[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DbFlashcardSet;
      sets.push({ id: doc.id, ...data });
    });

    // Client-side search filtering
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      sets = sets.filter(
        (set) =>
          set.name.toLowerCase().includes(lowercaseSearchTerm) ||
          set?.tags?.some((tag) =>
            tag.toLowerCase().includes(lowercaseSearchTerm)
          )
      );
    }

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const hasMore = querySnapshot.docs.length === limit;

    return {
      sets,
      lastDoc: lastVisible,
      hasMore
    };
  } catch (error) {
    console.error('Error fetching sets:', error);
    throw error;
  }
};

export const downloadSet = async (setId: string): Promise<DbFlashcardSet> => {
  try {
    const db = getDb();
    const setDoc = await getDoc(doc(db, 'flashcardSets', setId));
    return setDoc.data() as DbFlashcardSet;
  } catch (error) {
    console.error('Error downloading set:', error);
    throw error;
  }
};
