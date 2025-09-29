import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface TodoItemProps {
  task: string;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onDelete }) => {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.task}>{task}</Text>
      <Button title="Xóa" onPress={onDelete} color="#e53935" />
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  task: {
    fontSize: 16,
    flex: 1,
  },
});

export default TodoItem;
