import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { Anime } from '@/components/commons/hooks/getfullAnimeQuery'

export default function Animeitem({ obj }: { obj: Anime }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.container, {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.outline
      }]} 
      onPress={() => router.push({
        pathname: "/opening",
        params: { animeData: JSON.stringify(obj) }
      })}
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <ImageBackground 
            source={{ uri: obj.images.jpg.image_url }} 
            style={styles.image}
            imageStyle={styles.imageStyle}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {obj.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    marginVertical: 6,
    paddingBottom: 28,
  },
  contentContainer: {
    flexDirection: 'row',
    height: 220,
  },
  imageContainer: {
    width: '33%',
    height: '100%',
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageStyle: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  textContainer: {
    flex: 1,
    padding: 12,
    alignContent:'stretch',
fontSize:19,
fontWeight:'bold'
  },
  title: {
    fontSize: 16,
  }
})