import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, ScrollView, Image, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function PerfilScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('Monitor');
  const [disciplinas, setDisciplinas] = useState(['Química', 'Biologia']);
  const [comentario, setComentario] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão negada para acessar fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoPerfil(result.assets[0].uri);
    }
  };

  const alternarDisciplina = (disciplina) => {
    if (disciplinas.includes(disciplina)) {
      setDisciplinas(disciplinas.filter(d => d !== disciplina));
    } else {
      setDisciplinas([...disciplinas, disciplina]);
    }
  };

  const salvarPerfil = () => {
    Alert.alert('Perfil Salvo', 'Suas informações foram atualizadas com sucesso!');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Ionicons name="settings-outline" size={24} color="#000" />
      </View>

      {/* Foto de perfil */}
      <View style={styles.fotoContainer}>
        <TouchableOpacity onPress={escolherFoto}>
          {fotoPerfil ? (
            <Image source={{ uri: fotoPerfil }} style={styles.fotoPerfil} />
          ) : (
            <View style={styles.fotoPlaceholder}>
              <Ionicons name="camera-outline" size={32} color="#888" />
              <Text style={{ color: '#888', marginTop: 5 }}>Adicionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Formulário */}
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seuemail@email.com"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.tipoBox}>
          <TouchableOpacity
            style={[styles.tipoBtn, tipo === 'Monitor' && styles.tipoSelecionado]}
            onPress={() => setTipo('Monitor')}
          >
            <Text style={styles.tipoText(tipo === 'Monitor')}>Monitor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tipoBtn, tipo === 'Aluno' && styles.tipoSelecionado]}
            onPress={() => setTipo('Aluno')}
          >
            <Text style={styles.tipoText(tipo === 'Aluno')}>Aluno</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Disciplinas</Text>
        <View style={styles.disciplinasBox}>
          {['Química', 'Biologia', 'Física', 'Matemática'].map((disciplina) => (
            <TouchableOpacity
              key={disciplina}
              style={[
                styles.disciplinaTag,
                disciplinas.includes(disciplina) && styles.disciplinaAtiva,
              ]}
              onPress={() => alternarDisciplina(disciplina)}
            >
              <Text style={{
                color: disciplinas.includes(disciplina) ? '#fff' : '#004080'
              }}>
                {disciplina}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addTag}>
            <Text style={{ color: '#004080', fontWeight: 'bold' }}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Comentário / Bio</Text>
        <TextInput
          style={styles.bioInput}
          multiline
          placeholder="Escreva algo sobre você..."
          value={comentario}
          onChangeText={setComentario}
        />

        <TouchableOpacity style={styles.saveButton} onPress={salvarPerfil}>
          <Text style={styles.saveButtonText}>Salvar Perfil</Text>
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#004080',
    },
    fotoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    fotoPerfil: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: '#004080',
    },
    fotoPlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      marginTop: 15,
      fontSize: 16,
      color: '#004080',
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginTop: 5,
    },
    tipoBox: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 10,
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
    disciplinasBox: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 10,
    },
    disciplinaTag: {
      borderWidth: 1,
      borderColor: '#004080',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    disciplinaAtiva: {
      backgroundColor: '#004080',
    },
    addTag: {
      borderWidth: 1,
      borderColor: '#004080',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 5,
      backgroundColor: '#fff',
    },
    bioInput: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 12,
      marginTop: 8,
      minHeight: 100,
      textAlignVertical: 'top',
    },
    saveButton: {
      backgroundColor: '#004080',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 30,
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  