// src/components/payments/StripeCheckoutButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function StripeCheckoutButton() {
  const handleStripeCheckout = async () => {
    try {
      const response = await fetch('https://smartlife.vercel.app/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'fastsafe2025@gmail.com', // Tu peux rendre ça dynamique
        }),
      });

      const data = await response.json();
      if (data?.url) {
        window.open(data.url, '_blank'); // ou Linking.openURL(data.url) dans mobile
      } else {
        Alert.alert('Erreur', 'Échec de la redirection Stripe');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de démarrer le paiement');
    }
  };

  return (
    <TouchableOpacity onPress={handleStripeCheckout} style={styles.button}>
      <Text style={styles.text}>💳 Passer au Premium (Stripe)</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0a84ff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
