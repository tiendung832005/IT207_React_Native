import React from 'react';
import { View, StyleSheet } from 'react-native';

const boxes = [
  { name: 'box1', color: '#EF4444', width: 100, height: 40 },
  { name: 'box2', color: '#F97316', width: 80, height: 50 },
  { name: 'box3', color: '#22C55E', width: 120, height: 60 },
  { name: 'box4', color: '#3B82F6', width: 90, height: 30 },
  { name: 'box5', color: '#8B5CF6', width: 110, height: 55 },
];

export default function Bai2() {
  return (
    <View style={styles.containerVertical}>
      {boxes.map((box, idx) => (
        <View
          key={box.name}
          style={{
            backgroundColor: box.color,
            width: box.width,
            height: box.height,
            margin: 8,
            borderRadius: 8,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  containerVertical: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});