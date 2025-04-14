// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import FinanceScreen from './src/screens/FinanceScreen';
import AssistantScreen from './src/screens/AssistantScreen';
import MusicScreen from './src/screens/MusicScreen';
import BooksScreen from './src/screens/BooksScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Accueil"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#7b61ff',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            borderTopWidth: 0,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: any = 'home-outline';

            switch (route.name) {
              case 'Accueil':
                iconName = 'home-outline';
                break;
              case 'Finances':
                iconName = 'cash-outline';
                break;
              case 'Assistant':
                iconName = 'calendar-outline';
                break;
              case 'Musique':
                iconName = 'musical-notes-outline';
                break;
              case 'Livres':
                iconName = 'book-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Finances" component={FinanceScreen} />
        <Tab.Screen name="Assistant" component={AssistantScreen} />
        <Tab.Screen name="Musique" component={MusicScreen} />
        <Tab.Screen name="Livres" component={BooksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
