import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ rating, size = 20, color = '#FFD700' }) => {
  // Convert 0-1 rating to 0-5 scale
  const scaledRating = rating * 5;

  const renderStar = (position) => {
    if (scaledRating >= position + 1) {
      // Full star
      return (
        <FontAwesome
          key={position}
          name='star'
          size={size}
          color={color}
          style={{ marginRight: 2 }}
        />
      );
    } else if (scaledRating > position) {
      // Partial star
      const percent = (scaledRating - position) * 100;
      return (
        <View key={position} style={{ position: 'relative', marginRight: 2 }}>
          <FontAwesome name='star-o' size={size} color={color} />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${percent}%`,
              overflow: 'hidden'
            }}
          >
            <FontAwesome name='star' size={size} color={color} />
          </View>
        </View>
      );
    } else {
      // Empty star
      return (
        <FontAwesome
          key={position}
          name='star-o'
          size={size}
          color={color}
          style={{ marginRight: 2 }}
        />
      );
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[0, 1, 2, 3, 4].map((position) => renderStar(position))}
    </View>
  );
};

export default StarRating;
