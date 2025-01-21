import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router'
import { Anime } from '@/components/commons/getAllAnimeQuery'

export default function Animeitem({ obj }: { obj: Anime }) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.vw} 
      onPress={() => router.push({
        pathname: '/opening',
        params: { animeData: JSON.stringify(obj) }
      })}
    >
      <View style={styles.imageContainer}>
        <ImageBackground 
          source={{ uri: obj.images.jpg.image_url }} 
          style={styles.image}
          imageStyle={{ borderRadius: 28, padding: 10 }}
        >
        </ImageBackground>
      </View>
  
      <View>
        <ThemedText style={{ flex: 1, flexDirection: 'row', width: 160 }}>
          {obj.title}
        </ThemedText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 300,
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 28,
    overflow: 'hidden', 
  },
  vw: {
    backgroundColor: '#00fff000',
    borderRadius: 28,
  }
})