import React from 'react';
import { View, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <View style={styles.tabBarWrapper}>
          <View style={[styles.tabBarShadow, { backgroundColor: theme.colors.shadow }]} />
          <View style={[styles.tabBarContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.onSurface }]}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;
              const color = isFocused ? theme.colors.onPrimary : theme.colors.onSurface;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  style={[
                    styles.tabItem,
                    isFocused && { backgroundColor: theme.colors.primary },
                    { transform: [{ skewX: index % 2 === 0 ? '-10deg' : '10deg' }] }
                  ]}
                >
                  <View style={{ transform: [{ skewX: index % 2 === 0 ? '10deg' : '-10deg' }] }}>
                    {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color, size: 28 })}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    >
      <Tab.Screen
        name="index"
        component={require('./index').default}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
        <Tab.Screen
        name="Manga"
        component={require('./manga').default}
        options={{
          tabBarLabel: 'Book',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="book-open-variant" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="search"
        component={require('./search').default}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="magnify" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={require('./profile').default}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    height: 70,
  },
  tabBarShadow: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    transform: [{ skewX: '-5deg' }],
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: '100%',
    borderWidth: 4,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});