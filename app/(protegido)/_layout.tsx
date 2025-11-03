import { Redirect, Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/state/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};



export default function ProtectedLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) { return <Redirect href="/login" />; }

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
  );
}
