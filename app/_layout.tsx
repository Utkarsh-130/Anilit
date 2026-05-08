import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

import { useColorScheme } from '@/hooks/useColorScheme';
import { CarterOne_400Regular } from '@expo-google-fonts/carter-one';
import { VampiroOne_400Regular } from '@expo-google-fonts/vampiro-one';

import { ThemeProvider as NHThemeProvider } from "@/lib/ThemeContext";
import { I18nProvider } from "@/lib/i18n/I18nContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const { LightTheme: NavLightTheme, DarkTheme: NavDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  reactNavigationDark: DarkTheme,
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(() => {
    const isDark = colorScheme === 'dark';
    return {
      ...(isDark ? MD3DarkTheme : MD3LightTheme),
      colors: isDark ? theme.dark : theme.light,
    };
  }, [colorScheme, theme]);

  const combinedTheme = useMemo(() => {
    const isDark = colorScheme === 'dark';
    const navTheme = isDark ? NavDarkTheme : NavLightTheme;
    const m3Colors = isDark ? theme.dark : theme.light;

    return {
      ...navTheme,
      colors: {
        ...navTheme.colors,
        background: m3Colors.background,
        card: m3Colors.surface,
        text: m3Colors.onSurface,
        border: m3Colors.outline,
        primary: m3Colors.primary,
      },
    };
  }, [colorScheme, theme]);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    CarterOne_400Regular,
    VampiroOne_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={paperTheme}>
        <I18nProvider>
          <NHThemeProvider>
            <ThemeProvider value={combinedTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="opening" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </NHThemeProvider>
        </I18nProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
