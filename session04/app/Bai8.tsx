import React, { useState } from 'react';

type Product = {
	id: number;
	name: string;
	price: number;
};

type CartItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};

const PRODUCTS: Product[] = [
	{ id: 1, name: 'Áo thun', price: 120000 },
	{ id: 2, name: 'Quần jeans', price: 350000 },
	{ id: 3, name: 'Giày sneaker', price: 800000 },
	{ id: 4, name: 'Mũ lưỡi trai', price: 90000 },
];

type ProductItemProps = {
	product: Product;
	onAddToCart: (product: Product) => void;
};

function ProductItem({ product, onAddToCart }: ProductItemProps) {
	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			background: '#fff',
			padding: '12px 18px',
			borderRadius: 10,
			boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
			marginBottom: 14,
			minWidth: 340
		}}>
			<div>
				<div style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name}</div>
				<div style={{ color: '#1976d2', fontSize: 16 }}>{product.price.toLocaleString()} VND</div>
			</div>
			<button
				style={{
					marginLeft: 16,
					padding: '8px 18px',
					borderRadius: 8,
					border: 'none',
					background: '#4caf50',
					color: '#fff',
					cursor: 'pointer',
					fontWeight: 'bold',
					fontSize: 16
				}}
				onClick={() => onAddToCart(product)}
			>
				Thêm vào giỏ
			</button>
		</div>
	);
}

export default function ShopScreen() {
	const [cart, setCart] = useState<CartItem[]>([]);

	// Tổng số lượng mặt hàng trong giỏ
	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

	// Xử lý thêm vào giỏ
	const handleAddToCart = (product: Product) => {
		setCart(prev => {
			const found = prev.find(item => item.id === product.id);
			if (found) {
				return prev.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				return [...prev, { ...product, quantity: 1 }];
			}
		});
	};

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			minHeight: '100vh',
			background: '#f5f5f5',
			paddingTop: 32
		}}>
			<div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>
				Số mặt hàng trong giỏ: {totalItems}
			</div>
			<div style={{ width: 380 }}>
				{PRODUCTS.map(product => (
					<ProductItem key={product.id} product={product} onAddToCart={handleAddToCart} />
				))}
			</div>
		</div>
	);
}
