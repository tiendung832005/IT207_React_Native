import React from 'react';
import { UserInfoCard } from './UserInfoCard';


export default function App() {
	return (
		<div style={{ padding: 32, background: '#f5f5f5', minHeight: '100vh' }}>
			<h2>Demo UserInfoCard</h2>
			<UserInfoCard
				name="Nguyen Van A"
				avatarUrl="https://i.pravatar.cc/150?u=1"
				email="nguyenvana@example.com"
			/>
			<UserInfoCard
				name="Tran Thi B"
				avatarUrl="https://i.pravatar.cc/150?u=2"
				email="tranthib@example.com"
			/>
		</div>
	);
}
