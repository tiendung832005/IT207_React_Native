import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function Bai10() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.formGroup}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={[styles.input, styles.inputError]}
					placeholder="Nhập email..."
					placeholderTextColor="#888"
					value=""
				/>
				<Text style={styles.errorText}>Email không hợp lệ. Vui lòng nhập đúng định dạng.</Text>
			</View>
			<View style={styles.formGroup}>
				<Text style={styles.label}>Mật khẩu</Text>
				<TextInput
					style={[styles.input, styles.inputSuccess]}
					placeholder="Nhập mật khẩu..."
					placeholderTextColor="#888"
					value=""
					secureTextEntry
				/>
			</View>
			<Pressable style={[styles.button, styles.buttonDisabled]} disabled>
				<Text style={styles.buttonText}>Đăng ký</Text>
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8f8f8',
		padding: 24,
	},
	formGroup: {
		width: '100%',
		marginBottom: 28,
	},
	label: {
		fontSize: 18,
		color: '#333',
		marginBottom: 8,
		fontWeight: 'bold',
	},
	input: {
		width: '100%',
		height: 48,
		backgroundColor: '#fff',
		borderRadius: 8,
		borderWidth: 2,
		borderColor: '#ddd',
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#333',
	},
	inputError: {
		borderColor: '#FF3B30',
	},
	inputSuccess: {
		borderColor: '#34C759',
	},
	errorText: {
		color: '#FF3B30',
		fontSize: 15,
		marginTop: 6,
	},
	button: {
		width: '100%',
		height: 48,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		backgroundColor: '#007AFF',
		elevation: 2,
	},
	buttonDisabled: {
		backgroundColor: '#cccccc',
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
});
