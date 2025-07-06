import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function InitialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Botão de Notificações */}
      <TouchableOpacity
        style={styles.notification}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Text style={styles.notificationText}>🔔</Text>
      </TouchableOpacity>

      {/* A LOGO como LINK para Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.title}></Text>
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
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#004080',
    marginBottom: 10,
  },
  notification: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  notificationText: {
    fontSize: 24,
  },
});
