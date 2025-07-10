import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InitialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Botão de Notificações */}
      <TouchableOpacity
        style={styles.notification}
        onPress={() => navigation.navigate('Notificações')}
      >
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Logo como link para login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.title}>Bem-vindo ao Help Students 💙</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#004080',
    marginBottom: 10,
  },
  notification: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#004080',
    borderRadius: 25,
    padding: 8,
  },
  notificationText: {
    fontSize: 24,
    color: '#fff',
  },
});
