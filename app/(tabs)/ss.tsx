import * as React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetAllAnime } from '@/components/commons/hooks/getfullAnimeQuery';
import Animeitem from './(nobott)/Animeitem';
import { debounce } from 'lodash';

const { width } = Dimensions.get('window');

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { data, isLoading } = useGetAllAnime(searchQuery);

  const renderItem = ({ item }: { item: Anime }) => (
    <View style={styles.animeItem}>
      <Animeitem obj={item} />
    </View>
  );

  const handleSearch = React.useCallback(
    debounce((text: string) => {
      setSearchQuery(text);
    }, 500),
    []
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="bodyLarge">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search anime"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      {data?.data && data.data.length > 0 ? (
        <FlatList
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text variant="bodyLarge">No results found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 10,
    elevation: 4,
  },
  listContainer: {
    padding: 8,
  },
  animeItem: {
    width: width / 2 - 16,
    margin: 8,
  }
});

export default MyComponent;