// src/screens/BooksScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const book = {
  title: 'L’Alchimiste',
  author: 'Paulo Coelho',
  summary:
    "L’Alchimiste raconte le voyage de Santiago, un jeune berger andalou parti à la recherche d’un trésor caché en Égypte. En chemin, il découvre que le véritable trésor est en lui-même. Un conte philosophique sur la poursuite de ses rêves.",
};

export default function BooksScreen() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>par {book.author}</Text>

      <TouchableOpacity onPress={() => setShowSummary(!showSummary)} style={styles.button}>
        <Text style={styles.buttonText}>
          {showSummary ? '🔽 Masquer' : '📖 Lire le résumé'}
        </Text>
      </TouchableOpacity>

      {showSummary && (
        <ScrollView style={styles.summaryBox}>
          <Text style={styles.summary}>{book.summary}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 24 },
  title: { fontSize: 26, color: '#fff', fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  author: { fontSize: 18, color: '#ccc', marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: '#7b61ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { fontSize: 16, color: '#fff', fontWeight: '600' },
  summaryBox: { backgroundColor: '#1a1a1a', padding: 16, borderRadius: 10, maxHeight: '60%' },
  summary: { fontSize: 16, color: '#eee', lineHeight: 24 },
});
