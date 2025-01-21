import { ThemedText } from '@/components/ThemedText';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText >Profile Screen</ThemedText>
    </View>
  );
}

