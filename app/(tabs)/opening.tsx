import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { useLocalSearchParams } from 'expo-router'
import { Anime } from '@/components/commons/getAllAnimeQuery'

export default function Opening() {
  const { animeData } = useLocalSearchParams();
  const anime: Anime = JSON.parse(animeData as string);
  
  return (
    <SafeAreaView>
      <ThemedText>opening</ThemedText>
      <ThemedText>{anime.title}</ThemedText>
      <ThemedText>{anime.synopsis}</ThemedText>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})