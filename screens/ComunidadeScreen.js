import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

const API_URL = 'https://HelpStudents.up.railway.app';

export default function ComunidadeScreen() {
  const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const calendario = ['02', '03', '04', '05', '06', '07', '08'];

  const [alerta, setAlerta] = useState('');
  const [agenda, setAgenda] = useState([]);
  const [monitoresSemana, setMonitoresSemana] = useState([]);
  const [listas, setListas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarComunidade = async () => {
      try {
        const [agendaResp, notificacoesResp, disciplinasResp] = await Promise.all([
          fetch(`${API_URL}/agenda`),
          fetch(`${API_URL}/notificacoes`),
          fetch(`${API_URL}/disciplinas`)
        ]);

        const agendaDados = await agendaResp.json();
        const notificacoes = await notificacoesResp.json();
        const disciplinas = await disciplinasResp.json();

        setAgenda(agendaDados[0]?.agenda || []);
        setAlerta(notificacoes[notificacoes.length - 1]?.texto || '');

        const monitoresFormatados = disciplinas.map((disciplina) => ({
          materia: disciplina.id,
          monitores: disciplina.comentarios
            .filter(c => c.includes('@monitor'))
            .map(c => c.split(':')[0]) // extrai o nome tipo @monitor1
        }));

        const todasListas = disciplinas.flatMap(d => d.listas || []);
        setMonitoresSemana(monitoresFormatados);
        setListas(todasListas);
      } catch (e) {
        console.warn('Erro ao carregar comunidade:', e);
      } finally {
        setCarregando(false);
      }
    };
    carregarComunidade();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#004080" />
        <Text style={{ marginTop: 10 }}>Carregando comunidade...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <FontAwesome5 name="book" size={20} color="#004080" />
          <Text style={styles.headerTitle}> Help Students </Text>
          <FontAwesome name="lightbulb-o" size={20} color="#004080" />
        </View>
      </View>

      {/* Barra de pesquisa */}
      <TextInput
        placeholder="Pesquisar"
        placeholderTextColor="#666"
        style={styles.search}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Alerta */}
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>{alerta || '📣 Nenhum alerta no momento.'}</Text>
        </View>

        {/* Agenda */}
        <View style={styles.agendaBox}>
          <Text style={styles.sectionTitle}>📅 Sua agenda</Text>
          {agenda.length === 0 ? (
            <Text style={{ color: '#666' }}>Nenhum horário disponível.</Text>
          ) : (
            agenda.map((item, i) => (
              <View key={i} style={{ marginVertical: 5 }}>
                <Text style={{ fontWeight: '600' }}>{item.dia}</Text>
                <Text>{item.horario} — {item.materia}: {item.assunto}</Text>
              </View>
            ))
          )}
        </View>

        {/* Monitores da Semana */}
        <Text style={styles.sectionTitle}>👨‍🏫 Monitores da Semana</Text>
        <View style={styles.monitorBox}>
          {monitoresSemana.map((item, i) => (
            <Text key={i}>
              • {item.materia}: {item.monitores.join(', ')}
            </Text>
          ))}
        </View>

        {/* Exercícios */}
        <Text style={styles.sectionTitle}>📄 Listas de Exercícios</Text>
        {listas.length === 0 ? (
          <Text style={{ color: '#666' }}>Nenhuma lista disponível.</Text>
        ) : (
          listas.map((lista, index) => (
            <TouchableOpacity key={index} style={styles.fileBox}>
              <Ionicons name="document-text-outline" size={20} color="#004080" />
              <Text style={styles.fileText}>{lista}</Text>
            </TouchableOpacity>
          ))
        )}

        {/* Calendário horizontal */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarScroll}>
          {calendario.map((dia, index) => (
            <View key={index} style={styles.calendarCircle}>
              <Text style={styles.calendarDay}>{dia}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
  },
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
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004080',
    marginHorizontal: 6,
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 15,
    marginBottom: 20,
  },
  alertBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  alertText: {
    color: '#004080',
  },
  agendaBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 10,
  },
  monitorBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  fileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  fileText: {
    marginLeft: 10,
    color: '#004080',
  },
  calendarScroll: {
    marginTop: 10,
    marginBottom: 30,
  },
  calendarCircle: {
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: '#fff',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#004080',
    borderWidth: 1.5,
  },
  calendarDay: {
    fontWeight: 'bold',
    color: '#004080',
    fontSize: 16,
  },
});
