// src/screens/MenuScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>📲 SmartLife Menu</Text>
      <Text style={styles.subtitle}>Choisissez un module à lancer</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>🏠 Accueil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Finance')}>
        <Text style={styles.buttonText}>💰 Finances</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Assistant')}>
        <Text style={styles.buttonText}>📅 Assistant IA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Music')}>
        <Text style={styles.buttonText}>🎵 Musique</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Books')}>
        <Text style={styles.buttonText}>📚 Livres</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 30, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#bbb', textAlign: 'center', marginBottom: 30 },
  button: {
    backgroundColor: '#1e1e1e',
    borderColor: '#7b61ff',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});
