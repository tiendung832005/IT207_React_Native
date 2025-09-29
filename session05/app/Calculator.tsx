import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', 'C', '=', '+'],
];

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handlePress = (value: string) => {
    if (value === 'C') {
      setDisplay('');
      setResult(null);
    } else if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        const evalResult = eval(display);
        setResult(evalResult.toString());
      } catch {
        setResult('Lỗi');
      }
    } else {
      if (result !== null) {
        // Nếu vừa có kết quả, bắt đầu phép tính mới
        if ('0123456789'.includes(value)) {
          setDisplay(value);
        } else {
          setDisplay((result || '') + value);
        }
        setResult(null);
      } else {
        setDisplay(display + value);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display || '0'}</Text>
        {result !== null && <Text style={styles.resultText}>= {result}</Text>}
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={styles.button}
                onPress={() => handlePress(btn)}
              >
                <Text style={styles.buttonText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  displayContainer: {
    minHeight: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  displayText: {
    fontSize: 32,
    color: '#333',
  },
  resultText: {
    fontSize: 24,
    color: '#1976d2',
    marginTop: 8,
  },
  buttonsContainer: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 6,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Calculator;
