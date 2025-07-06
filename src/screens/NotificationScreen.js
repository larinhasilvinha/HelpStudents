import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function NotificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Notificações</Text>

      <Text style={styles.message}>Nenhuma notificação no momento.</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
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
    marginBottom: 30,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  backButton: {
    marginTop: 30,
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
