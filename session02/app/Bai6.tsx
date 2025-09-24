import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';

const initialTasks = [
  'Học React Native',
  'Làm bài tập về nhà',
  'Đọc sách',
  'Tập thể dục',
  'Đi siêu thị',
];

const colors = ['#FFEBEE', '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5'];

export default function Bai6() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([task, ...tasks]);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc..."
          value={task}
          onChangeText={setTask}
        />
        <Pressable style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {tasks.map((item, idx) => (
          <View
            key={idx}
            style={[styles.taskItem, { backgroundColor: colors[idx % colors.length] }]}
          >
            <Text style={styles.taskText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 14,
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  taskItem: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 17,
    color: '#333',
  },
});
