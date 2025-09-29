import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

const COLORS = [
  { key: 'red', color: '#e53935' },
  { key: 'yellow', color: '#fbc02d' },
  { key: 'green', color: '#43a047' },
];

const getNextLight = (current: string) => {
  if (current === 'green') return 'yellow';
  if (current === 'yellow') return 'red';
  return 'green';
};

const TrafficLight: React.FC = () => {
  const [active, setActive] = useState<'red' | 'yellow' | 'green'>('green');

  return (
    <View style={styles.container}>
      <View style={styles.lightsContainer}>
        {COLORS.map((item) => (
          <View
            key={item.key}
            style={[
              styles.light,
              { backgroundColor: item.color, opacity: active === item.key ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>
      <Button title="Chuyển Đèn" onPress={() => setActive(getNextLight(active))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 24,
  },
  lightsContainer: {
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  light: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: '#333',
  },
});

export default TrafficLight;
