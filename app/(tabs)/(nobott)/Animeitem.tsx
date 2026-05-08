import { ImageBackground, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router'
import { Anime } from '@/components/commons/getAllAnimeQuery'
import { Surface, useTheme } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.46;

export default function Animeitem({ obj }: { obj: Anime }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={styles.cardContainer}>
      <Surface style={styles.card} elevation={0}>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => router.push({
            pathname: '/opening',
            params: { 
              animeData: JSON.stringify(obj),
              contentType: obj.type === 'Manga' || obj.type === 'Novel' || obj.type === 'One-shot' ? 'manga' : 'anime'
            }
          })}
        >
          <ImageBackground 
            source={{ uri: obj.images.jpg.large_image_url || obj.images.jpg.image_url }} 
            style={styles.image}
            imageStyle={styles.imageStyle}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.9)']}
              style={styles.gradient}
            />
            
            <View style={styles.topRow}>
              <View style={styles.mangaBadge}>
                <ThemedText style={styles.badgeText}>{obj.type.toUpperCase()}</ThemedText>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <ThemedText numberOfLines={2} style={styles.title}>
                {obj.title}
              </ThemedText>
              <View style={styles.bottomRow}>
                <ThemedText style={styles.score}>★ {obj.score || 'N/A'}</ThemedText>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 24,
    // Blocky Manga Shadow
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    backgroundColor: '#000',
    borderRadius: 24,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 280,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 0, // Squared internal image for manga look
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  topRow: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  mangaBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    transform: [{ rotate: '-5deg' }], // Dynamic manga tilt
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'CarterOne_400Regular', // Using Comic Font
    color: '#fff',
    lineHeight: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  score: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '900',
    fontFamily: 'CarterOne_400Regular',
  },
})