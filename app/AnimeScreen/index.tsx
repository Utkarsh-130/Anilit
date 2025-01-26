import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import HomeScreen from './home';
import UpcomingScreen from './upcoming';
import AiringScreen from './Airing';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function Index() {
  const theme = useTheme();

  return (
    
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.colors.surface },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
        }}
      >
        <Tab.Screen 
          name="home" 
          component={HomeScreen}
          options={{ tabBarLabel: 'Popular' }}
        />
        <Tab.Screen 
          name="upcoming" 
          component={UpcomingScreen}
          options={{ tabBarLabel: 'Upcoming' }}
        />
        <Tab.Screen 
          name="Airing" 
          component={AiringScreen}
          options={{ tabBarLabel: 'Airing' }}
        />
      </Tab.Navigator>
    </View>

  );
}

