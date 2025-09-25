import React, { useState } from 'react';

export default function Bai2() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#f5f5f5'
    }}>
      <div style={{
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#333'
      }}>{count}</div>
      <div>
        <button
          style={{
            fontSize: 24,
            padding: '12px 32px',
            marginRight: 16,
            borderRadius: 8,
            border: 'none',
            background: '#4caf50',
            color: '#fff',
            cursor: 'pointer'
          }}
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
        <button
          style={{
            fontSize: 24,
            padding: '12px 32px',
            borderRadius: 8,
            border: 'none',
            background: '#f44336',
            color: '#fff',
            cursor: 'pointer'
          }}
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
      </div>
    </div>
  );
}
