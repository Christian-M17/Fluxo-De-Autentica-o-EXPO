import { listarTorneios } from '@/service/challonge';
import { useAuth } from '@/state/AuthContext';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';




export default function HomeScreen() {
  const { user, logOut } = useAuth();
  const [torneios, setTorneios] = useState<any[]>([]);

  useEffect(() => {
    async function carregarTorneios() {
      const dados = await listarTorneios();
      setTorneios(dados);
    }
    carregarTorneios();
  }, []);


  return (
    <View>
      
        <Text style={styles.texto}>Usuário: {user}</Text>

        {user === 'admin' && (
          <Text style={styles.texto}>Você é um administrador.</Text>
        )}
      <Button title="Sair" onPress={logOut} />
      
      {torneios.length > 0 ? (
  torneios.map((torneio, index) => (
    <View key={index} style={styles.card}>
      <Text style={styles.titulo}>{torneio.nome}</Text>
      <Text style={styles.data}>
        Iniciado em: {new Date(torneio.criadoEm).toLocaleString("pt-BR")}
      </Text>
    </View>
  ))
) : (
  <Text>Nenhum torneio encontrado.</Text>
)}



   </View>
  );
}

const styles = StyleSheet.create({
  card : {
    backgroundColor: '#ff7300ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2cff',
    marginBottom: 8,
  },
  data: {
    color: '#ffffffff',
  },
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
