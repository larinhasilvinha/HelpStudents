import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView
} from 'react-native';

const API_URL = 'https://HelpStudents.up.railway.app';

export default function NotificationScreen({ navigation }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarNotificacoes = async () => {
      try {
        const resposta = await fetch(`${API_URL}/notificacoes`);
        const dados = await resposta.json();
        setNotificacoes(dados);
      } catch (e) {
        console.warn('Erro ao carregar notificações:', e);
      } finally {
        setCarregando(false);
      }
    };

    buscarNotificacoes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Notificações</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#004080" />
      ) : notificacoes.length === 0 ? (
        <Text style={styles.message}>Nenhuma notificação no momento.</Text>
      ) : (
        <ScrollView style={{ width: '100%' }}>
          {notificacoes.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>{item.texto}</Text>
              <Text style={styles.cardDate}>{item.data}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#004080',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
