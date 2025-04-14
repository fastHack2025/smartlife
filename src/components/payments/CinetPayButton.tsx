// src/components/payments/CinetPayButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Alert } from 'react-native';

export default function CinetPayButton() {
  const handleCinetPay = async () => {
    try {
      const response = await fetch('https://smartlife.vercel.app/api/cinetpay/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: '+237694341586',
          amount: 2000,
          transaction_id: `SL-${Date.now()}`,
          description: 'Abonnement SmartLife Premium',
        }),
      });

      const data = await response.json();
      if (data?.payment_url) {
        Linking.openURL(data.payment_url);
      } else {
        Alert.alert('Erreur', 'Redirection CinetPay impossible.');
      }
    } catch (e) {
      Alert.alert('Erreur', 'Paiement non lancé.');
    }
  };

  return (
    <TouchableOpacity onPress={handleCinetPay} style={styles.button}>
      <Text style={styles.text}>💵 Payer avec Mobile Money (CinetPay)</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7b61ff',
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
