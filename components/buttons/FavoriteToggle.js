import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const FavoriteToggle = ({ isFavorite, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      <MaterialIcons
        name={isFavorite ? 'star' : 'star-border'}
        size={24}
        color={isFavorite ? '#FFD700' : '#666'}
      />
    </TouchableOpacity>
  );
};

export default FavoriteToggle;
