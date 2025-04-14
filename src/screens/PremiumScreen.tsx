// src/screens/PremiumScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StripeCheckoutButton from '../components/payments/StripeCheckoutButton';
import CinetPayButton from '../components/payments/CinetPayButton';

export default function PremiumScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔓 Passer à SmartLife Premium</Text>
      <Text style={styles.subtitle}>
        Profite de toutes les fonctionnalités IA, rappels automatiques, support prioritaire, contenu exclusif, synchronisation cloud et plus encore.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💳 Option Internationale</Text>
        <StripeCheckoutButton />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💵 Option Cameroun & Afrique</Text>
        <CinetPayButton />
      </View>

      <Text style={styles.note}>
        Une fois le paiement validé, ton compte sera automatiquement activé en mode Premium.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#0f0f0f',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#ccc',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  note: {
    color: '#777',
    fontSize: 14,
    marginTop: 40,
    textAlign: 'center',
  },
});
