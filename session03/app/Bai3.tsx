import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Heart, MessageCircle, Send } from 'lucide-react-native';

export default function Bai3() {
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Nguyen Van B</Text>
      </View>

      {/* Content */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
        style={styles.postImage}
      />

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <Heart color="#EF4444" size={28} />
        <MessageCircle color="#3B82F6" size={28} />
        <Send color="#22C55E" size={28} />
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Một ngày đẹp trời trên bãi biển với sóng 🌊 và nắng ☀️.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#333',
  },
});
