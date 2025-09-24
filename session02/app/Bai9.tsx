import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const images = Array.from({ length: 21 }, (_, i) => `https://picsum.photos/id/${i + 10}/200/200`);

export default function Bai9() {
	const handlePress = (url: string) => {
		Alert.alert('Ảnh', `Bạn đã chọn ảnh: ${url}`);
	};
	return (
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<View style={styles.grid}>
				{images.map((url, idx) => (
					<TouchableOpacity
						key={idx}
						style={styles.imageWrapper}
						activeOpacity={0.7}
						onPress={() => handlePress(url)}
					>
						<Image source={{ uri: url }} style={styles.image} />
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		padding: 12,
		alignItems: 'center',
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
	},
	imageWrapper: {
		width: 104,
		height: 104,
		margin: 6,
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: '#eee',
		elevation: 2,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
});
