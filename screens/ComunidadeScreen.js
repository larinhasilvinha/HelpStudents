import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity
} from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

export default function ComunidadeScreen() {
  const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const calendario = ['02', '03', '04', '05', '06', '07', '08'];

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
          <Text style={styles.alertText}>
            📣 @aluno7: Hoje nossa monitoria será de <Text style={{ fontWeight: 'bold' }}>12h às 14h</Text>.
          </Text>
        </View>

        {/* Agenda */}
        <View style={styles.agendaBox}>
          <Text style={styles.sectionTitle}>📅 Sua agenda</Text>
          <View style={styles.dayRow}>
            {dias.map((dia, i) => (
              <Text key={i} style={styles.dayText}>{dia}</Text>
            ))}
          </View>
          <View style={styles.namesRow}>
            <Text style={styles.nameText}>@aluno5</Text>
            <Text style={styles.nameText}>@aluno6</Text>
          </View>
        </View>

        {/* Monitores da Semana */}
        <Text style={styles.sectionTitle}>👨‍🏫 Monitores da Semana</Text>
        <View style={styles.monitorBox}>
          <Text>• Química: @monitor2</Text>
          <Text>• Português: @monitor1, @monitor3</Text>
          <Text>• Biologia: @monitor4</Text>
          <Text>• Física: @monitor7</Text>
          <Text>• Redação: @monitor3, @monitor8</Text>
        </View>

        {/* Exercícios */}
        <Text style={styles.sectionTitle}>📄 Listas de Exercícios</Text>
        <TouchableOpacity style={styles.fileBox}>
          <Ionicons name="document-text-outline" size={20} color="#004080" />
          <Text style={styles.fileText}>ExercícioQuímica.pdf</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fileBox}>
          <Ionicons name="document-text-outline" size={20} color="#004080" />
          <Text style={styles.fileText}>ExercícioFísica.pdf</Text>
        </TouchableOpacity>

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
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dayText: {
    fontWeight: '600',
    color: '#666',
  },
  namesRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    gap: 20,
  },
  nameText: {
    color: '#004080',
    fontWeight: 'bold',
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
