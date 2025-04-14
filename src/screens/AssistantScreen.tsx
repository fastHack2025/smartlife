// src/screens/AssistantScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../utils/notifications';
import { sendCinetSms } from '../api/sendCinetSms';

export default function AssistantScreen() {
  const [tasks, setTasks] = useState<{ title: string; date: string }[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleAddTask = async () => {
    if (!title || !date) {
      Alert.alert('Erreur', 'Renseigne un titre et une date.');
      return;
    }

    const scheduleDate = new Date(date);
    if (isNaN(scheduleDate.getTime())) {
      Alert.alert('Format de date invalide', 'Utilise un format comme 2025-04-15 14:00');
      return;
    }

    // 🔔 Notification locale
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🧠 Rappel SmartLife',
        body: title,
      },
      trigger: scheduleDate,
    });

    // 📩 SMS automatique
    try {
      const smsMessage = `📲 Rappel SmartLife : ${title} prévu le ${date}`;
      await sendCinetSms('+237694341586', smsMessage);
      console.log('✅ SMS automatique envoyé.');
    } catch (err) {
      console.warn('⚠️ Erreur envoi SMS automatique :', err.message);
    }

    setTasks([...tasks, { title, date }]);
    setTitle('');
    setDate('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 Assistant IA</Text>
      <Text style={styles.subtitle}>Ajoute une tâche, sois notifié & reçois un SMS</Text>

      <TextInput
        placeholder="Ex: Réunion direction"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Ex: 2025-04-15 14:00"
        value={date}
        onChangeText={setDate}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>✅ Ajouter + Rappel + SMS</Text>
      </TouchableOpacity>

      <ScrollView style={styles.taskList}>
        <Text style={styles.sectionTitle}>📆 Mes Tâches</Text>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskTitle}>🔔 {task.title}</Text>
            <Text style={styles.taskDate}>⏰ {task.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 20 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#bbb', marginBottom: 20 },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#333',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#7b61ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  taskList: { flex: 1 },
  sectionTitle: { fontSize: 20, color: '#ccc', marginBottom: 10 },
  taskItem: {
    backgroundColor: '#1c1c1c',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#7b61ff',
  },
  taskTitle: { color: '#fff', fontSize: 16, fontWeight: '500' },
  taskDate: { color: '#999', fontSize: 14 },
});
