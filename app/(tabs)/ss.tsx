import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetAllAnime, Anime } from '@/components/commons/getAllAnimeQuery';
import Animeitem from '@/app/(tabs)/(nobott)/Animeitem';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { data, isLoading } = useGetAllAnime();

  const filteredAnime = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter(anime => 
      anime.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const renderItem = ({ item, index }: { item: Anime; index: number }) => {
    if (index % 2 === 0) {
      return (
        <View style={styles.rowContainer}>
          <Animeitem obj={item} />
          {filteredAnime[index + 1] && <Animeitem obj={filteredAnime[index + 1]} />}
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search anime"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredAnime}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  }
});
export default MyComponent;