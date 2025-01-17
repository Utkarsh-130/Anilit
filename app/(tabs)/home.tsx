import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useGetAllAnime, Anime } from '@/components/commons/getAllAnimeQuery';

const HomeScreen = () => {
  const { data, isLoading } = useGetAllAnime();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Anime }) => (
    <View style={styles.itemContainer}>
      <Text variant="titleMedium">{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        ListEmptyComponent={
          <Text variant="headlineMedium">No anime data available</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;

