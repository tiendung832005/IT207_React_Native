import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>(['Học React Native', 'Làm bài tập']);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc mới"
          value={input}
          onChangeText={setInput}
        />
        <Button title="Thêm" onPress={handleAdd} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.todo}>{item}</Text>}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  todo: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default TodoList;
