// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL =  'https://HelpStudents.up.railway.app';

export default function LoginScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const preencherNomeAutomaticamente = async () => {
      const nomeSalvo = await AsyncStorage.getItem('nomeTemporario');
      if (nomeSalvo) {
        setNome(nomeSalvo);
        await AsyncStorage.removeItem('nomeTemporario');
      }
    };
    preencherNomeAutomaticamente();
  }, []);

  const handleLogin = async () => {
    if (!nome || !senha) {
      Alert.alert('Erro de login', 'Preencha nome e senha!');
      return;
    }

    setCarregando(true);
    try {
      const resposta = await fetch(`${API_URL}/usuarios?nome=${nome}&senha=${senha}`);
      const usuarios = await resposta.json();

      if (usuarios.length > 0) {
        const usuario = usuarios[0];
        await AsyncStorage.setItem('token', 'token-falso');
        await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
        navigation.replace('Main');
      } else {
        Alert.alert('Login inválido', 'Usuário ou senha incorretos!');
      }
    } catch (e) {
      Alert.alert('Erro de conexão', 'Não foi possível fazer login.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>LOGIN</Text>

      <Text>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <View style={styles.linkRow}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Esqueci a senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={carregando}>
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: '100%',
    marginVertical: 8,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  linkText: {
    fontSize: 14,
    color: '#0000cd',
  },
  button: {
    backgroundColor: '#00bfff',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
