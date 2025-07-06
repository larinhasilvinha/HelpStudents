import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function AgendaScreen() {
  const [tipoUsuario, setTipoUsuario] = useState('Monitor');
  const [agenda, setAgenda] = useState([
    { dia: '', horario: '', materia: '', assunto: '' },
    { dia: '', horario: '', materia: '', assunto: '' },
    { dia: '', horario: '', materia: '', assunto: '' },
  ]);

  const chaveStorage = (perfil) => `agenda_${perfil.toLowerCase()}`;

  // Carrega dados do AsyncStorage ao trocar tipo
  useEffect(() => {
    const carregar = async () => {
      try {
        const chave = chaveStorage(tipoUsuario);
        const dados = await AsyncStorage.getItem(chave);
        if (dados) setAgenda(JSON.parse(dados));
        else setAgenda([
          { dia: '', horario: '', materia: '', assunto: '' },
          { dia: '', horario: '', materia: '', assunto: '' },
          { dia: '', horario: '', materia: '', assunto: '' },
        ]);
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar a agenda.');
      }
    };
    carregar();
  }, [tipoUsuario]);

  const salvarAgenda = async () => {
    try {
      const chave = chaveStorage(tipoUsuario);
      await AsyncStorage.setItem(chave, JSON.stringify(agenda));
      Alert.alert('Sucesso', `Agenda do ${tipoUsuario} salva com sucesso!`);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a agenda.');
    }
  };

  const atualizarCampo = (index, campo, valor) => {
    const novaAgenda = [...agenda];
    novaAgenda[index][campo] = valor;
    setAgenda(novaAgenda);
  };

  const renderBloco = (index) => (
    <View key={index} style={styles.bloco}>
      <View style={styles.headerBloco}>
        <View style={styles.barraProgresso}></View>
        <Ionicons name="checkbox-outline" size={20} color="#004080" />
      </View>
      {['dia', 'horario', 'materia', 'assunto'].map((campo) => (
        <View key={campo} style={styles.campo}>
          <Text style={styles.label}>{campo.charAt(0).toUpperCase() + campo.slice(1)}</Text>
          <TextInput
            value={agenda[index][campo]}
            onChangeText={(valor) => atualizarCampo(index, campo, valor)}
            placeholder={`Digite o(a) ${campo}`}
            style={styles.input}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda do {tipoUsuario}</Text>

      {/* Seletor */}
      <View style={styles.tipoBox}>
        {['Monitor', 'Aluno'].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.tipoBtn,
              tipoUsuario === tipo && styles.tipoSelecionado,
            ]}
            onPress={() => setTipoUsuario(tipo)}
          >
            <Text style={styles.tipoText(tipoUsuario === tipo)}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {agenda.map((_, i) => renderBloco(i))}

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAgenda}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.textoSalvar}>Salvar Agenda</Text>
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
      paddingHorizontal: 20,
    },
    titulo: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#004080',
      marginBottom: 10,
    },
    tipoBox: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 20,
    },
    tipoBtn: {
      flex: 1,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: '#004080',
      borderRadius: 10,
      alignItems: 'center',
    },
    tipoSelecionado: {
      backgroundColor: '#004080',
    },
    tipoText: (ativo) => ({
      color: ativo ? '#fff' : '#004080',
      fontWeight: '600',
    }),
    bloco: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
    },
    headerBloco: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    barraProgresso: {
      width: 60,
      height: 4,
      backgroundColor: '#004080',
      borderRadius: 2,
    },
    campo: {
      marginBottom: 10,
    },
    label: {
      color: '#004080',
      marginBottom: 4,
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: '#F0F9FF',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 8,
    },
    botaoSalvar: {
      flexDirection: 'row',
      backgroundColor: '#004080',
      padding: 12,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      gap: 8,
    },
    textoSalvar: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  