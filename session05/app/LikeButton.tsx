import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const LikeButton: React.FC = () => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, liked ? styles.liked : styles.unliked]}
        onPress={() => setLiked((prev) => !prev)}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>{liked ? 'Đã thích' : 'Thích'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  unliked: {
    backgroundColor: '#aaa',
  },
  liked: {
    backgroundColor: '#1976d2',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LikeButton;
