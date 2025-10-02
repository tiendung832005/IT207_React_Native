
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

const STORAGE_KEY = 'todos';

const TodoListScreen = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTodos = async () => {
			const value = await AsyncStorage.getItem(STORAGE_KEY);
			if (value) {
				try {
					setTodos(JSON.parse(value));
				} catch {}
			}
			setLoading(false);
		};
		fetchTodos();
	}, []);

	useEffect(() => {
		if (!loading) {
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
	}, [todos, loading]);

	const handleAdd = () => {
		if (input.trim()) {
			setTodos(prev => [
				...prev,
				{ id: Date.now(), text: input.trim(), completed: false },
			]);
			setInput('');
		}
	};

	const handleToggle = (id: number) => {
		setTodos(prev => prev.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		));
	};

	const handleDelete = (id: number) => {
		setTodos(prev => prev.filter(todo => todo.id !== id));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>To-Do List</Text>
			<View style={styles.inputRow}>
				<TextInput
					style={styles.input}
					value={input}
					onChangeText={setInput}
					placeholder="Thêm công việc mới..."
				/>
				<Button title="Thêm" onPress={handleAdd} />
			</View>
			<FlatList
				data={todos}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.todoRow}>
						<TouchableOpacity onPress={() => handleToggle(item.id)}>
							<Text style={[styles.todoText, item.completed && styles.completed]}>
								{item.text}
							</Text>
						</TouchableOpacity>
						<Button title="Xóa" color="red" onPress={() => handleDelete(item.id)} />
					</View>
				)}
				ListEmptyComponent={<Text style={styles.empty}>Chưa có công việc nào</Text>}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 16,
		textAlign: 'center',
	},
	inputRow: {
		flexDirection: 'row',
		marginBottom: 16,
		alignItems: 'center',
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#888',
		borderRadius: 6,
		paddingHorizontal: 8,
		height: 40,
		marginRight: 8,
	},
	todoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
		justifyContent: 'space-between',
	},
	todoText: {
		fontSize: 18,
	},
	completed: {
		textDecorationLine: 'line-through',
		color: '#888',
	},
	empty: {
		textAlign: 'center',
		color: '#aaa',
		marginTop: 32,
	},
});

export default TodoListScreen;
