import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const subjects = [
  { name: 'Matemática', icon: 'calculator', color: '#7DD3FC', lib: 'FontAwesome' },
  { name: 'Física', icon: 'ios-planet', color: '#FACC15', lib: 'Ionicons' },
  { name: 'Química', icon: 'flask', color: '#C084FC', lib: 'FontAwesome' },
  { name: 'Biologia', icon: 'leaf', color: '#A78BFA', lib: 'FontAwesome' },
  { name: 'História', icon: 'book', color: '#60A5FA', lib: 'FontAwesome' },
  { name: 'Geografia', icon: 'globe', color: '#FBBF24', lib: 'FontAwesome' },
  { name: 'Português', icon: 'pencil', color: '#F472B6', lib: 'FontAwesome' },
  { name: 'Inglês', icon: 'language', color: '#34D399', lib: 'FontAwesome' },
  { name: 'Filosofia', icon: 'user', color: '#FDBA74', lib: 'FontAwesome' },
  { name: 'Programação', icon: 'code', color: '#4ADE80', lib: 'FontAwesome' },
  { name: 'Sociologia', icon: 'users', color: '#F87171', lib: 'FontAwesome' },
  { name: 'Redação', icon: 'file-text', color: '#A3A3A3', lib: 'FontAwesome' },
];

const monitors = [
  { name: 'Monitor Matemática', rating: 4.5, image: require('../../assets/monitor1.png') },
  { name: 'Monitor Física', rating: 4.8, image: require('../../assets/monitor2.png') },
];

export default function HomeScreen() {
  const navigation = useNavigation();

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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 10 }}
          
        >
          <TouchableOpacity
  style={styles.botaoVoltar}
  onPress={() => navigation.navigate('Main')}
>
   
</TouchableOpacity> 

          {subjects.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.subjectBox, { backgroundColor: item.color, marginRight: 10 }]}
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
              <Image source={item.image} style={styles.monitorImage} />
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
