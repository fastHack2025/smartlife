// src/screens/FinanceScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function FinanceScreen() {
  const [entries, setEntries] = useState<{ type: 'income' | 'expense'; label: string; amount: number }[]>([]);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const totalIncome = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;
  const isGreen = balance >= 0;

  const handleAdd = () => {
    const amt = parseFloat(amount);
    if (!label || isNaN(amt)) {
      Alert.alert('Erreur', 'Renseigne un libellé et un montant valide.');
      return;
    }
    setEntries([...entries, { type, label, amount: amt }]);
    setLabel('');
    setAmount('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>💰 Finance SmartLife</Text>
      <View style={[styles.balanceBox, { backgroundColor: isGreen ? '#2ecc71' : '#e74c3c' }]}>
        <Text style={styles.balanceText}>
          {isGreen ? 'Solde positif' : '⚠️ Solde négatif'} : {balance.toFixed(0)} FCFA
        </Text>
      </View>

      <TextInput
        placeholder="Libellé (ex: Salaire, Loyer)"
        value={label}
        onChangeText={setLabel}
        style={styles.input}
      />
      <TextInput
        placeholder="Montant (ex: 20000)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <View style={styles.typeSelector}>
        <TouchableOpacity onPress={() => setType('income')} style={[styles.typeButton, type === 'income' && styles.active]}>
          <Text style={styles.typeText}>+ Revenu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType('expense')} style={[styles.typeButton, type === 'expense' && styles.active]}>
          <Text style={styles.typeText}>- Dépense</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
        <Text style={styles.addButtonText}>Ajouter</Text>
      </TouchableOpacity>

      <Text style={styles.subheader}>Historique</Text>
      {entries.map((entry, index) => (
        <View key={index} style={styles.entry}>
          <Text style={styles.entryLabel}>{entry.label}</Text>
          <Text style={[styles.entryAmount, { color: entry.type === 'income' ? '#2ecc71' : '#e74c3c' }]}>
            {entry.type === 'income' ? '+' : '-'} {entry.amount} FCFA
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#111', flex: 1 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  balanceBox: { padding: 15, borderRadius: 10, marginBottom: 20 },
  balanceText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  input: { backgroundColor: '#222', padding: 12, borderRadius: 8, marginBottom: 10, color: '#fff' },
  typeSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  typeButton: { flex: 1, padding: 10, marginHorizontal: 5, borderRadius: 8, backgroundColor: '#333' },
  active: { backgroundColor: '#7b61ff' },
  typeText: { color: '#fff', textAlign: 'center' },
  addButton: { backgroundColor: '#7b61ff', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subheader: { fontSize: 20, color: '#ccc', marginBottom: 10 },
  entry: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#333' },
  entryLabel: { color: '#eee' },
  entryAmount: { fontWeight: '600' },
});
