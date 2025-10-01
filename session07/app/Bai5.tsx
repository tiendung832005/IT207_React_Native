import React, { useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

type Todo = {
  id: number;
  name: string;
  completed: boolean;
};

type Action =
  | { type: "ADD_TODO"; name: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), name: action.name, completed: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

const TodoList = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: "ADD_TODO", name: input });
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập công việc..."
        />
        <Button title="Thêm" onPress={handleAdd} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <TouchableOpacity
              onPress={() => dispatch({ type: "TOGGLE_TODO", id: item.id })}
            >
              <Text
                style={[styles.todoText, item.completed && styles.completed]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            <Button
              title="Xóa"
              color="red"
              onPress={() => dispatch({ type: "DELETE_TODO", id: item.id })}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Chưa có công việc nào</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
    marginRight: 8,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  todoText: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  empty: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 32,
  },
});

export default TodoList;
