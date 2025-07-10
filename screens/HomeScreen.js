import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://HelpStudents.up.railway.app'; // Substitua pelo seu link real

export default function HomeScreen() {
  const navigation = useNavigation();

  const [subjects, setSubjects] = useState([]);
  const [monitors, setMonitors] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarHome = async () => {
      try {
        const resposta = await fetch(`${API_URL}/home`);
        const dados = await resposta.json();
        setSubjects(dados.subjects || []);
        setMonitors(dados.monitors || []);
      } catch (e) {
        console.warn('Erro ao buscar dados da home:', e);
      } finally {
        setCarregando(false);
      }
    };
    carregarHome();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00bfff" />
        <Text style={{ marginTop: 10 }}>Carregando conteúdo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Notificações')}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Pesquisa */}
      <TextInput
        placeholder="Pesquisar"
        style={styles.search}
        placeholderTextColor="#666"
      />

      <ScrollView>
        {/* Disciplinas */}
        <Text style={styles.sectionTitle}>Disciplinas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {subjects.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.subjectBox, { backgroundColor: item.color || '#00bfff', marginRight: 10 }]}
              onPress={() => navigation.navigate('Disciplina', { nomeDisciplina: item.name })}
            >
              {item.lib === 'FontAwesome' ? (
                <FontAwesome name={item.icon} size={30} color="#fff" />
              ) : (
                <Ionicons name={item.icon} size={30} color="#fff" />
              )}
              <Text style={styles.subjectText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Monitores */}
        <Text style={styles.sectionTitle}>Monitores</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {monitors.map((item, index) => (
            <View key={index} style={styles.monitorCard}>
              <Image source={{ uri: item.image }} style={styles.monitorImage} />
              <Text style={styles.monitorName}>{item.name}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 150,
    resizeMode: 'contain',
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subjectBox: {
    width: 110,
    height: 90,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  subjectText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: '600',
    textAlign: 'center',
  },
  monitorCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 150,
    marginRight: 15,
    alignItems: 'center',
  },
  monitorImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  monitorName: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  rating: {
    marginTop: 5,
    color: '#F59E0B',
    fontWeight: '600',
  },
});
