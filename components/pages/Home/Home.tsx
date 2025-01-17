import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useGetAllAnime, Anime } from '@/components/commons/getAllAnimeQuery';

const HomeScreen = () => {
  const { data, isLoading } = useGetAllAnime();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <Text variant="headlineMedium">Loading...</Text>
      ) : data ? (
        data.data.map((anime: Anime, key: number) => (
          <View key={key}>
            <Text variant="headlineMedium">{anime.title}</Text>
          </View>
        ))
      ) : null}
    </View>
  );
};

export default HomeScreen; 