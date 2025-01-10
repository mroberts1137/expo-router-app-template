import uuid from 'react-native-uuid';

export const generateUniqueId = () => uuid.v4() as string;
