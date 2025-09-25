import React, { useState } from 'react';

type TodoItemProps = {
	note: string;
	onDelete: () => void;
};

function TodoItem({ note, onDelete }: TodoItemProps) {
	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			background: '#fff',
			padding: '10px 16px',
			borderRadius: 8,
			boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
			marginBottom: 10,
			minWidth: 320
		}}>
			<span style={{ fontSize: 17 }}>{note}</span>
			<button
				style={{
					marginLeft: 16,
					padding: '6px 16px',
					borderRadius: 6,
					border: 'none',
					background: '#f44336',
					color: '#fff',
					cursor: 'pointer',
					fontWeight: 'bold'
				}}
				onClick={onDelete}
			>
				Xóa
			</button>
		</div>
	);
}

export default function Bai6() {
	const [note, setNote] = useState('');
	const [notes, setNotes] = useState<string[]>([]);

	const handleAdd = () => {
		if (note.trim() !== '') {
			setNotes([...notes, note.trim()]);
			setNote('');
		}
	};

	const handleDelete = (idx: number) => {
		setNotes(notes.filter((_, i) => i !== idx));
	};

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: '100vh',
			background: '#f5f5f5'
		}}>
			<h2>Ghi chú đơn giản</h2>
			<div style={{ display: 'flex', marginBottom: 24 }}>
				<input
					type="text"
					placeholder="Nhập ghi chú..."
					value={note}
					onChange={e => setNote(e.target.value)}
					style={{
						fontSize: 17,
						padding: '8px 16px',
						borderRadius: 8,
						border: '1px solid #ccc',
						width: 240,
						marginRight: 12
					}}
				/>
				<button
					style={{
						fontSize: 17,
						padding: '8px 24px',
						borderRadius: 8,
						border: 'none',
						background: '#1976d2',
						color: '#fff',
						cursor: 'pointer',
						fontWeight: 'bold'
					}}
					onClick={handleAdd}
				>
					Thêm
				</button>
			</div>
			<div style={{ width: 340 }}>
				{notes.length === 0 ? (
					<div style={{ color: '#888', textAlign: 'center' }}>Chưa có ghi chú nào.</div>
				) : (
					notes.map((n, idx) => (
						<TodoItem key={idx} note={n} onDelete={() => handleDelete(idx)} />
					))
				)}
			</div>
		</div>
	);
}
