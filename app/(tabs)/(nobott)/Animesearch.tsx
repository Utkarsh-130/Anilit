import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { Anime } from '@/components/commons/hooks/getfullAnimeQuery'
import { Manga } from '@/components/commons/hooks/getAllManga'
import { useColorScheme } from 'react-native'
import { ThemeContext } from '@react-navigation/native'
import { ThemedText } from '@/components/ThemedText'

const Animesearch = ({ obj }: { obj: Anime },{mobj}:{mobj:Manga}) => {
  const router = useRouter();
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const backgroundColor = colorScheme === 'dark' ? theme.colors.background : theme.colors.surface;

  return (<>
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <TouchableOpacity
        style={[
          styles.touchable,
          { backgroundColor: isDarkMode ? '#333' : '#ccc' },
        ]}
        onPress={() => router.push({
          pathname: "/opening",
          params: { animeData: JSON.stringify(obj) }
        })}
      >
        <ImageBackground
          source={{ uri: obj.images.jpg.image_url }}
          style={styles.image}
          imageStyle={styles.imageStyle}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {obj.title_japanese}
        </Text>
        <Text style={styles.title} numberOfLines={3}>
          {obj.title}
        </Text>
        <Text style={styles.title} numberOfLines={3}>
          {obj.genres.map((genre) => genre.name).join(', ')}
        </Text>
        <Text style={styles.title} numberOfLines={3}>
          {obj.episodes}
        </Text>
        <Text style={styles.title} numberOfLines={3}>
          {obj.score}
        </Text>
        <Text style={styles.synopsis} numberOfLines={2}>
          {obj.synopsis}
        </Text>
      </View>
    </View>
     <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <TouchableOpacity
        style={[
          styles.touchable,
          { backgroundColor: isDarkMode ? '#333' : '#ccc' },
        ]}
        onPress={() => router.push({
          pathname: "/opening",
          params: { animeData: JSON.stringify(obj) }
        })}
      >
        <ImageBackground
          source={{ uri: obj.images.jpg.image_url }}
          style={styles.image}
          imageStyle={styles.imageStyle}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {obj.title_japanese}
        </Text>
        <Text style={styles.title} numberOfLines={3}>
          {obj.title}
        </Text>
        <Text style={styles.title} numberOfLines={3}>
          {obj.genres.map((genre) => genre.name).join(', ')}
        </Text>
        <Text style={styles.title} numberOfLines={3}>
          {obj.episodes}
        </Text>
        <Text style={styles.title} numberOfLines={3}>
          {obj.score}
        </Text>
        <Text style={styles.synopsis} numberOfLines={2}>
          {obj.synopsis}
        </Text>
      </View>
    </View></>
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
  touchable: {
    padding: 10,
    borderRadius: 5,
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
  },
  synopsis: {
    fontSize: 14,
    marginTop: 4,
  }
})

export default Animesearch;