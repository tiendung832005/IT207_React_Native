
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CurrentTime = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.time}>{time.toLocaleTimeString()}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	time: {
		fontSize: 40,
		fontWeight: 'bold',
	},
});

export default CurrentTime;
