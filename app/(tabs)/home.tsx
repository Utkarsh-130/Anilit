import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useGetAllAnime, Anime } from '@/components/commons/getAllAnimeQuery';
import Animeitem from './Animeitem';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { data, isLoading } = useGetAllAnime();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: Anime; index: number }) => {
    if (index % 2 === 0) {
      return (
        <View style={styles.rowContainer}>
          <Animeitem obj={item} />
          {data?.data[index + 1] && <Animeitem obj={data.data[index + 1]} />}
        </View>
      );
    }
    return null;
  };

  const handleScroll = (e: any) => {
    const yOffset = e.nativeEvent.contentOffset.y / 1;
    // Handle scroll if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        onScroll={handleScroll}
        data={data?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
        ListEmptyComponent={
          <Text variant="headlineMedium">No anime data available</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
