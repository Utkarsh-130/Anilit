import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { Anime } from '@/components/commons/getAllAnimeQuery'

export default function Animeitem({ obj }: { obj: Anime }) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => router.push({
        pathname: "/(tabs)/(nobott)/opening" as const,
        params: { animeData: JSON.stringify(obj) }
      })}
    >
      <View style={styles.imageContainer}>
        <ImageBackground 
          source={{ uri: obj.images.jpg.image_url }} 
          style={styles.image}
          imageStyle={styles.imageStyle}
        />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {obj.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  imageContainer: {
    aspectRatio: 2/3,
    width: '100%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageStyle: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    padding: 8,
    fontSize: 14,
    textAlign: 'center',
  }
});