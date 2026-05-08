/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const paperTheme = useTheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  // Map template color names to Paper theme color names
  const paperColorMap: Record<string, any> = {
    background: paperTheme.colors.background,
    text: paperTheme.colors.onSurface,
    tint: paperTheme.colors.primary,
    icon: paperTheme.colors.outline,
  };

  return paperColorMap[colorName] ?? Colors[theme][colorName];
}
