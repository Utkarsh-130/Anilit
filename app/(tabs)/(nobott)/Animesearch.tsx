import { ImageBackground, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { Text, useTheme, Surface } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { Anime } from '@/components/commons/hooks/getfullAnimeQuery'
import { Manga } from '@/components/commons/hooks/getAllManga'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window');

const Animesearch = ({ obj, mobj }: { obj: Anime; mobj?: Manga }) => {
  const router = useRouter();
  const theme = useTheme();

  if (!obj) return null;

  return (
    <View style={styles.personaWrapper}>
      <View style={[styles.personaShadow, { backgroundColor: theme.colors.shadow }]} />
      <Surface style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.onSurface }]} elevation={0}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push({
            pathname: "/opening",
            params: { 
              animeData: JSON.stringify(obj),
              contentType: obj.type === 'Manga' || obj.type === 'Novel' || obj.type === 'One-shot' ? 'manga' : 'anime'
            }
          })}
        >
          <View style={styles.contentContainer}>
            <View style={[styles.imageWrapper, { borderColor: theme.colors.onSurface, backgroundColor: theme.colors.primary }]}>
              <ImageBackground
                source={{ uri: obj.images?.jpg?.large_image_url || obj.images?.jpg?.image_url }}
                style={styles.image}
              >
                <LinearGradient
                  colors={['transparent', theme.colors.primary]}
                  style={styles.imageOverlay}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 0, y: 1 }}
                />
                <View style={[styles.scoreBadge, { backgroundColor: theme.colors.onSurface, borderColor: theme.colors.surface }]}>
                  <Text style={[styles.scoreText, { color: theme.colors.surface }]}>{obj.score || '??'}</Text>
                </View>
              </ImageBackground>
            </View>

            <View style={[styles.textContainer, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.titleBox}>
                <Text style={[styles.japaneseTitle, { color: theme.colors.primary }]} numberOfLines={1}>
                  {obj.title_japanese}
                </Text>
                <Text style={[styles.englishTitle, { color: theme.colors.onSurface }]} numberOfLines={2}>
                  {obj.title.toUpperCase()}
                </Text>
              </View>

              <View style={styles.genreRow}>
                {obj.genres?.slice(0, 3).map((genre, idx) => (
                  <View key={idx} style={[styles.genreTag, { backgroundColor: idx % 2 === 0 ? theme.colors.onSurface : theme.colors.primary }]}>
                    <Text style={[styles.genreText, { color: idx % 2 === 0 ? theme.colors.surface : theme.colors.onPrimary }]}>{genre.name}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.metaRow}>
                <View style={[styles.metaBox, { backgroundColor: theme.colors.onSurface }]}>
                  <Text style={[styles.metaText, { color: theme.colors.surface }]}>EP {obj.episodes || '?'}</Text>
                </View>
                <View style={[styles.metaBox, { backgroundColor: theme.colors.primary }]}>
                  <Text style={[styles.metaText, { color: theme.colors.onPrimary }]}>{obj.type.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  personaWrapper: {
    marginHorizontal: 16,
    marginVertical: 10,
    position: 'relative',
    transform: [{ rotate: '-1deg' }],
  },
  personaShadow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    transform: [{ skewX: '-5deg' }],
  },
  container: {
    borderWidth: 4,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    height: 180,
  },
  imageWrapper: {
    width: '35%',
    height: '100%',
    borderRightWidth: 4,
    transform: [{ skewY: '-2deg' }],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scoreBadge: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    padding: 8,
    transform: [{ rotate: '15deg' }],
    borderWidth: 2,
  },
  scoreText: {
    fontSize: 18,
    fontFamily: 'CarterOne_400Regular',
  },
  textContainer: {
    flex: 1,
    padding: 12,
  },
  titleBox: {
    marginBottom: 8,
    transform: [{ skewX: '-5deg' }],
  },
  japaneseTitle: {
    fontSize: 12,
    fontWeight: '900',
    marginBottom: -4,
  },
  englishTitle: {
    fontSize: 18,
    fontFamily: 'CarterOne_400Regular',
    lineHeight: 22,
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginVertical: 8,
  },
  genreTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    transform: [{ rotate: '2deg' }],
  },
  genreText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 'auto',
  },
  metaBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    transform: [{ skewX: '-10deg' }],
  },
  metaText: {
    fontSize: 11,
    fontWeight: '900',
  },
})

export default Animesearch;