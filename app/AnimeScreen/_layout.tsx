import { Tabs } from 'expo-router/tabs';
import { useTheme } from 'react-native-paper';

export default function AnimeScreenLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.surface },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title: 'Popular'
        }}
      />
      <Tabs.Screen 
        name="upcoming"
        options={{
          title: 'Upcoming'
        }}
      />
      <Tabs.Screen 
        name="Airing"
        options={{
          title: 'Airing'
        }}
      />
    </Tabs>
  );
} 