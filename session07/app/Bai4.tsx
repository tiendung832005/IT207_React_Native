
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

const NetworkStatus = () => {
	const netInfo = useNetInfo();

	return (
		<View style={styles.container}>
			{!netInfo.isConnected && (
				<View style={styles.banner}>
					<Text style={styles.bannerText}>Mất kết nối mạng!</Text>
				</View>
			)}
			<Text style={styles.label}>Trạng thái kết nối: {netInfo.isConnected ? 'Có' : 'Không'}</Text>
			<Text style={styles.label}>Loại kết nối: {netInfo.type}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 40,
	},
	banner: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'red',
		padding: 12,
		zIndex: 10,
	},
	bannerText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
	},
	label: {
		fontSize: 20,
		marginVertical: 8,
	},
});

export default NetworkStatus;
