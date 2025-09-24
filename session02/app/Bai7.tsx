import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

const initialMessages = [
	{ text: 'Xin chào!', sender: 'receiver' },
	{ text: 'Chào bạn, bạn cần hỗ trợ gì?', sender: 'sender' },
	{ text: 'Tôi muốn hỏi về React Native.', sender: 'receiver' },
	{ text: 'Bạn cứ hỏi nhé!', sender: 'sender' },
];

export default function Bai7() {
	const [messages, setMessages] = useState(initialMessages);
	const [input, setInput] = useState('');
	const scrollRef = useRef<ScrollView>(null);

	const handleSend = () => {
		if (input.trim()) {
			setMessages([...messages, { text: input, sender: 'sender' }]);
			setInput('');
			setTimeout(() => {
				if (scrollRef.current) {
					scrollRef.current.scrollToEnd({ animated: true });
				}
			}, 100);
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={80}
			>
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					ref={scrollRef}
				>
					{messages.map((msg, idx) => (
						<View
							key={idx}
							style={[styles.bubbleRow, msg.sender === 'sender' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}
						>
							<View
								style={[styles.bubble, msg.sender === 'sender' ? styles.bubbleSender : styles.bubbleReceiver]}
							>
								<Text style={styles.bubbleText}>{msg.text}</Text>
							</View>
						</View>
					))}
				</ScrollView>
				<View style={styles.inputArea}>
					<TextInput
						style={styles.input}
						placeholder="Nhập tin nhắn..."
						value={input}
						onChangeText={setInput}
						multiline
					/>
					<TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.7}>
						<Text style={styles.sendButtonText}>Gửi</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#f8f8f8',
	},
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	scroll: {
		flex: 1,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	scrollContent: {
		paddingVertical: 16,
	},
	bubbleRow: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	bubble: {
		maxWidth: '75%',
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 18,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 2,
	},
	bubbleSender: {
		backgroundColor: '#007AFF',
		alignSelf: 'flex-end',
	},
	bubbleReceiver: {
		backgroundColor: '#e5e5ea',
		alignSelf: 'flex-start',
	},
	bubbleText: {
		color: '#222',
		fontSize: 16,
	},
	inputArea: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		padding: 10,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderColor: '#eee',
	},
	input: {
		flex: 1,
		minHeight: 40,
		maxHeight: 100,
		backgroundColor: '#f2f2f2',
		borderRadius: 18,
		paddingHorizontal: 14,
		fontSize: 16,
		marginRight: 10,
		color: '#333',
	},
	sendButton: {
		backgroundColor: '#007AFF',
		borderRadius: 18,
		paddingHorizontal: 18,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
	},
	sendButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
