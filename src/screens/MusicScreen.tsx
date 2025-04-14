// src/screens/MusicScreen.tsx
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

export default function MusicScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const song = {
    title: 'Dora',
    artist: 'Ko-C',
    artwork: 'https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/mobile-mockup_iawxjt.png',
    url: 'https://res.cloudinary.com/dko5sommz/video/upload/v1744416232/background_abzanh.mp4' // temporairement audio/mp4
  };

  const handlePlayPause = async () => {
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync({ uri: song.url });
      soundRef.current = sound;
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      const status = await soundRef.current.getStatusAsync();
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: song.artwork }} style={styles.artwork} />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
        <Text style={styles.buttonText}>{isPlaying ? '⏸️ Pause' : '▶️ Lecture'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', alignItems: 'center', justifyContent: 'center', padding: 20 },
  artwork: { width: 260, height: 260, borderRadius: 20, marginBottom: 30 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  artist: { fontSize: 18, color: '#bbb', marginBottom: 30 },
  button: {
    backgroundColor: '#7b61ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});
