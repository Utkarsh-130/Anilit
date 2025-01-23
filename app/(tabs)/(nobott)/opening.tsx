import { StyleSheet, View, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { useLocalSearchParams } from 'expo-router'
import { Anime } from '@/components/commons/getAllAnimeQuery'
import ParallaxScrollView from '@/components/ParallaxScrollView'

import { Surface, Text,Button } from 'react-native-paper';
export default function Opening() {
  const { animeData } = useLocalSearchParams();
  const anime: Anime = JSON.parse(animeData as string);
  
  return (
    <ParallaxScrollView
      headerImage={
        <ImageBackground 
          source={{uri: anime.images.jpg.image_url}}
          style={{width: '100%', height: '100%'}}
        />
      }
      headerBackgroundColor={{dark: 'black', light: 'white'}}
    >
      <SafeAreaView>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
     <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
 
    <ThemedText>{anime.type}</ThemedText>
  </Button>
  </View>
    
 
        <ThemedText>{anime.title}</ThemedText>
        <ThemedText>{anime.title_japanese}</ThemedText>
   <Surface style={styles.surface} elevation={4}>
     <ThemedText>{anime.synopsis}</ThemedText>
  </Surface>
       
      </SafeAreaView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({

   button: {
   width:"20%",
   height:"20%"
  },
   surface: {
    padding: 8,
    height: 'auto',
    width: '98%',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
})