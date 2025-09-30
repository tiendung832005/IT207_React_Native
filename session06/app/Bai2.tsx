import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const INIT_DATA = [
	{ id: '1', name: 'HTML, CSS, JavaScript' },
	{ id: '2', name: 'Python' },
	{ id: '3', name: 'React.js' },
];

export default function Bai2() {
	const [data, setData] = useState<{ id: string; name: string }[]>([]);

	const handleAddData = () => {
		setData(INIT_DATA);
	};

	const renderItem = ({ item }: { item: { id: string; name: string } }) => (
		<View style={styles.item}>
			<Text style={styles.name}>{item.name}</Text>
		</View>
	);

	const renderEmpty = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>Không có dữ liệu</Text>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleAddData}>
				<Text style={styles.buttonText}>THÊM DỮ LIỆU</Text>
			</TouchableOpacity>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				contentContainerStyle={data.length === 0 ? styles.emptyList : styles.list}
				ListEmptyComponent={renderEmpty}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fafafa',
		paddingTop: 24,
	},
	button: {
		backgroundColor: '#1976d2',
		paddingVertical: 12,
		borderRadius: 4,
		marginHorizontal: 16,
		marginBottom: 24,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
		letterSpacing: 1,
	},
	list: {
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	emptyList: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	item: {
		backgroundColor: '#fff',
		padding: 16,
		borderRadius: 8,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	name: {
		fontSize: 16,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 120,
	},
	emptyText: {
		color: '#888',
		fontSize: 16,
	},
});
