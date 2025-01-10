import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { debounce } from '@/utils/debounce';
import { MaterialIcons } from '@expo/vector-icons';
import { makeStyles, useTheme } from '@rneui/themed';

const SearchBar = ({ searchTerm, onSearch }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState(searchTerm);

  const debouncedSearch = debounce((text) => {
    onSearch(text);
  }, 300);

  const handleSearch = (text) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name='search'
        size={24}
        color={theme.colors.textSecondary}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder='Search by tags...'
        placeholderTextColor={theme.colors.textSecondary}
        value={searchText}
        onChangeText={handleSearch}
      />
      {searchText ? (
        <MaterialIcons
          name='close'
          size={24}
          color={theme.colors.textSecondary}
          style={styles.icon}
          onPress={() => handleSearch('')}
        />
      ) : null}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    flexDirection: 'row',
    margin: 16,
    paddingHorizontal: 12
  },
  icon: {
    padding: 4
  },
  input: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 16,
    padding: 12
  }
}));

export default SearchBar;
