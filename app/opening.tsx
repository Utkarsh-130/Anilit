import { StyleSheet, View, ImageBackground, Dimensions, ScrollView, Linking, Share } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Anime, useGetStreaming } from '@/components/commons/hooks/getfullAnimeQuery'
import { useGetMangaExternal } from '@/components/commons/hooks/getAllManga'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { Surface, Button, useTheme, IconButton, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function Opening() {
  const { animeData, contentType } = useLocalSearchParams();
  const anime: Anime = JSON.parse(animeData as string);
  const isManga = contentType === 'manga';

  const { data: streamingData, isLoading: isStreamingLoading } = useGetStreaming(isManga ? -1 : anime.id);
  const { data: mangaData, isLoading: isMangaLoading } = useGetMangaExternal(isManga ? anime.id : -1);
  
  const theme = useTheme();
  const router = useRouter();
  
  const externalData = isManga ? mangaData?.data : streamingData?.data;
  const isLoading = isManga ? isMangaLoading : isStreamingLoading;
  const sectionTitle = isManga ? 'Where to Read' : 'Where to Watch';
  const emptyText = isManga ? 'No reading links available' : 'No streaming data available';

  const handleTrailer = () => {
    if (anime.trailer?.url) {
      Linking.openURL(anime.trailer.url);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${anime.title} on Anilis!`,
        url: anime.url,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <ParallaxScrollView
      headerHeight={450}
      headerImage={
        <View style={styles.headerContainer}>
          <ImageBackground 
            source={{uri: anime.images.jpg.large_image_url || anime.images.jpg.image_url}}
            style={styles.headerImage}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'transparent', theme.colors.background]}
              style={styles.gradient}
            />
          </ImageBackground>
          <IconButton 
            icon="chevron-left" 
            size={30} 
            onPress={() => router.back()} 
            style={styles.backButton}
            containerColor="rgba(0,0,0,0.3)"
          />
        </View>
      }
      headerBackgroundColor={{dark: 'black', light: 'white'}}
    >
      <ImageBackground
        source={{uri: anime.images.jpg.image_url}}
        style={styles.contentBackground}
        blurRadius={100}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={[styles.content, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
          <View style={styles.indicator} />
          
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>{anime.title}</ThemedText>
              <ThemedText style={styles.subtitle}>{anime.title_japanese}</ThemedText>
            </View>
            <View style={styles.scoreContainer}>
              <View style={styles.scoreShadow} />
              <Surface style={styles.scoreCard} elevation={0}>
                <ThemedText style={styles.scoreText}>{anime.score || 'N/A'}</ThemedText>
                <ThemedText style={styles.scoreLabel}>SCORE</ThemedText>
              </Surface>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            <View style={[styles.mangaChip, { transform: [{ rotate: '-2deg' }] }]}>
              <ThemedText style={styles.chipText}>{anime.type.toUpperCase()}</ThemedText>
            </View>
            <View style={[styles.mangaChip, { transform: [{ rotate: '3deg' }] }]}>
              <ThemedText style={styles.chipText}>{anime.rating || 'G'}</ThemedText>
            </View>
            <View style={[styles.mangaChip, { transform: [{ rotate: '-1deg' }] }]}>
              <ThemedText style={styles.chipText}>HD 4K</ThemedText>
            </View>
          </ScrollView>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{sectionTitle}</ThemedText>
            {isLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : externalData?.length ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.streamRow}>
                {externalData.map((platform, idx) => (
                  <View key={idx} style={styles.platformButtonContainer}>
                    <View style={styles.platformShadow} />
                    <Surface style={styles.streamCard} elevation={0}>
                      <Button 
                        mode="text" 
                        onPress={() => Linking.openURL(platform.url)}
                        labelStyle={styles.platformButtonLabel}
                      >
                        {platform.name.toUpperCase()}
                      </Button>
                    </Surface>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <ThemedText style={styles.emptyText}>{emptyText}</ThemedText>
            )}
          </View>
      
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Synopsis</ThemedText>
            <View style={styles.synopsisContainer}>
              <ThemedText style={styles.synopsis}>{anime.synopsis}</ThemedText>
            </View>
          </View>

          <View style={styles.actionRow}>
            {anime.trailer?.url && !isManga && (
              <View style={styles.mainActionContainer}>
                <View style={styles.mainActionShadow} />
                <Button 
                  mode="contained" 
                  icon="play" 
                  onPress={handleTrailer} 
                  style={styles.mainButton}
                  labelStyle={styles.buttonLabel}
                  buttonColor="#000"
                >
                  WATCH TRAILER
                </Button>
              </View>
            )}
            {isManga && (
              <View style={styles.mainActionContainer}>
                <View style={styles.mainActionShadow} />
                <Button 
                  mode="contained" 
                  icon="book-open-page-variant" 
                  onPress={() => router.push({ pathname: '/mangachapters', params: { mangaTitle: anime.title } })}
                  style={styles.mainButton}
                  labelStyle={styles.buttonLabel}
                  buttonColor="#000"
                >
                  READ MANGA
                </Button>
              </View>
            )}
            <IconButton 
              icon="bookmark" 
              mode="contained" 
              containerColor="#000"
              iconColor="#fff"
              size={24}
              onPress={() => {}} 
              style={styles.iconAction}
            />
            <IconButton 
              icon="share-variant" 
              mode="contained" 
              containerColor="#000"
              iconColor="#fff"
              size={24}
              onPress={handleShare} 
              style={styles.iconAction}
            />
          </View>
        </View>
      </ImageBackground>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 450,
    width: width,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#fff',
  },
  contentBackground: {
    marginTop: -40,
    overflow: 'hidden',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  backgroundImageStyle: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  content: {
    minHeight: 500,
    padding: 24,
    paddingTop: 12,
    borderTopWidth: 4,
    borderColor: '#000',
  },
  indicator: {
    width: 60,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
    transform: [{ rotate: '-1deg' }],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 40,
    fontFamily: 'CarterOne_400Regular',
    lineHeight: 46,
    letterSpacing: -1,
    color: '#000',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.6,
    marginTop: 4,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  scoreContainer: {
    position: 'relative',
    transform: [{ rotate: '5deg' }],
  },
  scoreShadow: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  scoreCard: {
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 85,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'CarterOne_400Regular',
    color: '#000',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '900',
    marginTop: -2,
    color: '#000',
  },
  chipRow: {
    gap: 12,
    marginBottom: 32,
    paddingRight: 20,
  },
  mangaChip: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  chipText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'CarterOne_400Regular',
    marginBottom: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
  streamRow: {
    gap: 16,
    paddingRight: 20,
    paddingBottom: 10,
  },
  platformButtonContainer: {
    position: 'relative',
  },
  platformShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: '#000',
    borderRadius: 16,
  },
  streamCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  platformButtonLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000',
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.5,
    fontStyle: 'italic',
  },
  synopsisContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 20,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'dashed',
  },
  synopsis: {
    fontSize: 16,
    lineHeight: 26,
    color: '#000',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 40,
  },
  mainActionContainer: {
    flex: 1,
    position: 'relative',
  },
  mainActionShadow: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  mainButton: {
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  buttonLabel: {
    fontSize: 18,
    fontFamily: 'CarterOne_400Regular',
    letterSpacing: 1,
  },
  iconAction: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
  },
})