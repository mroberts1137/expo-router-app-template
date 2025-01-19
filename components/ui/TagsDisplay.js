import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';

const TagsDisplay = ({ tags, onRemove }) => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tagsContainer}
    >
      {tags &&
        tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            {onRemove && (
              <TouchableOpacity onPress={() => onRemove(tag)}>
                <MaterialIcons
                  name='close'
                  size={16}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
    </ScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  tag: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    flexDirection: 'row',
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  tagText: {
    fontSize: 14,
    marginRight: 4,
    color: theme.colors.text
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 8,
    marginTop: 8
  }
}));

export default TagsDisplay;
