import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const clamp = (value: number) => Math.max(0, Math.min(255, value));

const ColorPicker: React.FC = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.preview,
          { backgroundColor: `rgb(${red},${green},${blue})` },
        ]}
      />
      <View style={styles.row}>
        <Text style={styles.label}>Red: {red}</Text>
        <Button title="-" onPress={() => setRed((v) => clamp(v - 1))} />
        <Button title="+" onPress={() => setRed((v) => clamp(v + 1))} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Green: {green}</Text>
        <Button title="-" onPress={() => setGreen((v) => clamp(v - 1))} />
        <Button title="+" onPress={() => setGreen((v) => clamp(v + 1))} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Blue: {blue}</Text>
        <Button title="-" onPress={() => setBlue((v) => clamp(v - 1))} />
        <Button title="+" onPress={() => setBlue((v) => clamp(v + 1))} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 100,
  },
});

export default ColorPicker;
