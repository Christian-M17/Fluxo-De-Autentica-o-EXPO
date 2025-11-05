import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useAuth } from '@/state/AuthContext';
import { Image } from 'expo-image';
import { Button, StyleSheet, Text } from 'react-native';


export default function HomeScreen() {
  const { user, logOut } = useAuth();
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <Text style={styles.texto}>Usuário: {user}</Text>
        {user === 'admin' && (
          <Text style={styles.texto}>Você é um administrador.</Text>
        )}
      <Button title="Sair" onPress={logOut} />
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  texto:{
    color: '#FFF',
    fontSize: 16,
    marginBottom: 16
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
