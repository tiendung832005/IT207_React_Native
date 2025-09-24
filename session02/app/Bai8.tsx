import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type CustomButtonProps = {
	title: string;
	type?: 'primary' | 'secondary' | 'danger' | 'disabled';
	disabled?: boolean;
	onPress: () => void;
};

function CustomButton({ title, type = 'primary', disabled = false, onPress }: CustomButtonProps) {
	let backgroundColor = '#007AFF';
	let textColor = '#fff';
	if (type === 'secondary') {
		backgroundColor = '#e0e0e0';
		textColor = '#333';
	} else if (type === 'danger') {
		backgroundColor = '#FF3B30';
		textColor = '#fff';
	} else if (type === 'disabled' || disabled) {
		backgroundColor = '#cccccc';
		textColor = '#888';
		disabled = true;
	}
	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{ backgroundColor, opacity: disabled ? 0.6 : pressed ? 0.8 : 1 },
			]}
			onPress={disabled ? undefined : onPress}
			disabled={disabled}
		>
			<Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
		</Pressable>
	);
}

export default function Bai8() {
	return (
		<View style={styles.container}>
			<CustomButton title="Primary Button" type="primary" onPress={() => {}} />
			<CustomButton title="Secondary Button" type="secondary" onPress={() => {}} />
			<CustomButton title="Danger Button" type="danger" onPress={() => {}} />
			<CustomButton title="Disabled Button" type="disabled" disabled onPress={() => {}} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8f8f8',
		padding: 20,
	},
	button: {
		width: 220,
		paddingVertical: 14,
		borderRadius: 10,
		marginBottom: 18,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 2,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
});
