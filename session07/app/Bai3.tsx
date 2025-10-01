
import React, { useRef } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const FocusInputScreen = () => {
	const inputRef = useRef<TextInput>(null);

	const handleFocus = () => {
		inputRef.current?.focus();
	};

	return (
		<View style={styles.container}>
			<TextInput
				ref={inputRef}
				style={styles.input}
				placeholder="Nhập gì đó..."
			/>
			<Button title="Focus vào ô nhập liệu" onPress={handleFocus} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	input: {
		width: '80%',
		height: 40,
		borderColor: '#888',
		borderWidth: 1,
		marginBottom: 16,
		paddingHorizontal: 8,
		borderRadius: 6,
	},
});

export default FocusInputScreen;
