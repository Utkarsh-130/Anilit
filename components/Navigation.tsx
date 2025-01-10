import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { usePathname } from 'expo-router';

export default function Navigation({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const pathname = usePathname();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => children,
    profile: () => children,
    settings: () => children,
  });

  React.useEffect(() => {
    const routeIndex = routes.findIndex(route => pathname.startsWith(`/${route.key}`));
    if (routeIndex !== -1 && routeIndex !== index) {
      setIndex(routeIndex);
    }
  }, [pathname]);

  const handleIndexChange = (index: number) => {
    setIndex(index);
    navigation.dispatch(
      CommonActions.navigate({
        name: routes[index].key,
        merge: true,
      })
    );
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
    />
  );
}

