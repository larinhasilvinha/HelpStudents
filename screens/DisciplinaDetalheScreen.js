import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const API_URL = 'https://HelpStudents.up.railway.app';

export default function DisciplinaDetalheScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const nomeDisciplina = route?.params?.nomeDisciplina;
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDisciplina = async () => {
      try {
        const resposta = await fetch(`${API_URL}/disciplinas`);
        const disciplinas = await resposta.json();
        const achada = disciplinas.find(d => d.id === nomeDisciplina);
        setDados(achada);
      } catch (e) {
        console.warn('Erro ao buscar disciplina:', e);
      } finally {
        setCarregando(false);
      }
    };
    buscarDisciplina();
  }, [nomeDisciplina]);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#004080" />
        <Text style={{ marginTop: 10 }}>Carregando disciplina...</Text>
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Disciplina não encontrada 😢</Text>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('Main')}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="#fff" />
          <Text style={styles.botaoVoltarTexto}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <FontAwesome5 name="book" size={20} color="#004080" />
          <Text style={styles.headerTitle}>Help Students</Text>
          <Ionicons name="flask-outline" size={22} color="#004080" style={{ marginLeft: 6 }} />
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.disciplinaNome}>📘 {nomeDisciplina}</Text>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>🕐 Horário fixo de monitoria</Text>
          {dados.horarios?.map((item, i) => (
            <Text key={i} style={styles.sectionLine}>• {item}</Text>
          ))}
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>📅 Aulas previstas na semana</Text>
          {dados.aulas?.map((item, i) => (
            <Text key={i} style={styles.sectionLine}>• {item}</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>📂 Material Didático</Text>
        {dados.materiais?.map((item, i) => (
          <TouchableOpacity key={i} style={styles.fileBox}>
            <Ionicons name="download-outline" size={20} color="#004080" />
            <Text style={styles.fileText}>{item}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>📝 Listas de Exercícios</Text>
        {dados.listas?.map((item, i) => (
          <TouchableOpacity key={i} style={styles.fileBox}>
            <Ionicons name="download-outline" size={20} color="#004080" />
            <Text style={styles.fileText}>{item}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>💬 Comentário dos Estudantes</Text>
        <View style={styles.commentBox}>
          {dados.comentarios?.map((comentario, i) => (
            <Text key={i} style={styles.comment}>{comentario}</Text>
          ))}
        </View>

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('Main')}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="#fff" />
          <Text style={styles.botaoVoltarTexto}>Voltar para Home</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004080',
    marginLeft: 8,
  },
  disciplinaNome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 15,
  },
  sectionBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#004080',
    marginBottom: 10,
  },
  sectionLine: {
    color: '#333',
    marginBottom: 6,
  },
  fileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  fileText: {
    marginLeft: 10,
    color: '#004080',
  },
  commentBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  comment: {
    color: '#333',
    marginBottom: 10,
  },
  botaoVoltar: {
    flexDirection: 'row',
    backgroundColor: '#004080',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  botaoVoltarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    color: '#004080',
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
});
