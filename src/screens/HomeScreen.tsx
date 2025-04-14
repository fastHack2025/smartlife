// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/logo-novacore_iqi2pd.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>SmartLife</Text>
        <Text style={styles.subtitle}>Votre assistant de vie intelligent, autonome et connecté.</Text>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Démarrer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Finance')}
          style={styles.secondaryButton}
        >
          <Text style={styles.buttonText}>💰 Voir mes finances</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.dlsolutions.com')}>
          <Text style={styles.footerText}>© Dave And Luce Solutions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#7b61ff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7b61ff',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
