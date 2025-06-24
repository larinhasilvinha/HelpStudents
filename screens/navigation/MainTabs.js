import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import ComunidadeScreen from './ComunidadeScreen';
import NotificationScreen from './NotificationScreen';
import CalendarioAlunoScreen from './CalendarioAlunoScreen';
import AgendaMonitorScreen from './AgendaMonitorScreen';
import PerfilScreen from './PerfilScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#004080',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: { fontSize: 11 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Comunidade':
              iconName = 'people';
              break;
            case 'Notificações':
              iconName = 'notifications-outline';
              break;
            case 'Calendário':
              iconName = 'calendar';
              break;
            case 'Agenda':
              iconName = 'clipboard-outline';
              break;
            case 'Perfil':
              iconName = 'person-circle-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#BEE3F8',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 6,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Comunidade" component={ComunidadeScreen} />
      <Tab.Screen name="Notificações" component={NotificationScreen} />
      <Tab.Screen name="Calendário" component={CalendarioAlunoScreen} />
      <Tab.Screen name="Agenda" component={AgendaMonitorScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
