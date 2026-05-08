import * as React from 'react';
import { View, FlatList, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { Searchbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetAllAnime,Anime } from '@/components/commons/hooks/getfullAnimeQuery';
import Animeitem from './(nobott)/Animesearch';
import { debounce } from 'lodash';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const { width } = Dimensions.get('window');
 const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
const MyComponent = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const { data, isLoading } = useGetAllAnime(searchQuery);

  const renderItem = ({ item }: { item: Anime }) => (
    <View style={[styles.animeItem, {  }]}>
      <Animeitem obj={item} />
    </View>
  );

  const debouncedSearch = React.useCallback(
    debounce((text: string) => {
      setSearchQuery(text);
    }, 500),
    []
  );

  const handleSearch = (text: string) => {
    setInputText(text);
    debouncedSearch(text);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchWrapper}>
        <View style={[styles.searchShadow, { backgroundColor: theme.colors.shadow }]} />
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.onSurface }]}>
          <Searchbar
            placeholder="SEARCH ANIME..."
            onChangeText={handleSearch}
            value={inputText}
            style={styles.searchBar}
            inputStyle={[styles.searchInput, { color: theme.colors.onSurface }]}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            iconColor={theme.colors.primary}
          />
        </View>
      </View>
      {data?.data && data.data.length > 0 ? (
        <FlatList
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          numColumns={1}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>No results found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWrapper: {
    margin: 16,
    position: 'relative',
    transform: [{ rotate: '-2deg' }],
  },
  searchShadow: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
  },
  searchContainer: {
    borderWidth: 4,
    overflow: 'hidden',
  },
  searchBar: {
    backgroundColor: 'transparent',
    elevation: 0,
    height: 60,
  },
  searchInput: {
    fontFamily: 'CarterOne_400Regular',
    fontSize: 18,
  },
  listContainer: {
    padding: 8,
    paddingBottom: 100, // Space for persona tab bar
  },
  animeItem: {
    width: width - 16,
    margin: 8,
  }
});

export default MyComponent;