import React, { useState } from 'react';

export default function Bai4() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		alert(`Email: ${email}\nMật khẩu: ${password}`);
	};

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
			background: '#f5f5f5'
		}}>
			<h2>Đăng nhập</h2>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				style={{
					fontSize: 18,
					padding: '10px 16px',
					marginBottom: 16,
					borderRadius: 8,
					border: '1px solid #ccc',
					width: 280
				}}
			/>
			<input
				type="password"
				placeholder="Mật khẩu"
				value={password}
				onChange={e => setPassword(e.target.value)}
				style={{
					fontSize: 18,
					padding: '10px 16px',
					marginBottom: 24,
					borderRadius: 8,
					border: '1px solid #ccc',
					width: 280
				}}
			/>
			<button
				style={{
					fontSize: 20,
					padding: '12px 32px',
					borderRadius: 8,
					border: 'none',
					background: '#1976d2',
					color: '#fff',
					cursor: 'pointer',
					fontWeight: 'bold'
				}}
				onClick={handleLogin}
			>
				Đăng nhập
			</button>
		</div>
	);
}
