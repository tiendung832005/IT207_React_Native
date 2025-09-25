import React, { useState } from 'react';

export default function Bai3() {
  const [isOn, setIsOn] = useState(false);

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
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: isOn ? 'yellow' : '#bbb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isOn ? '0 0 32px 8px yellow' : '0 0 8px 2px #aaa',
        marginBottom: 32,
        transition: 'background 0.3s, box-shadow 0.3s'
      }}>
        {/* Icon bóng đèn đơn giản bằng SVG */}
        <svg width="60" height="60" viewBox="0 0 24 24" fill={isOn ? 'gold' : '#888'}>
          <path d="M12 2a7 7 0 0 0-7 7c0 2.93 2.01 5.43 4.75 6.44V18a2.25 2.25 0 0 0 4.5 0v-2.56A7.001 7.001 0 0 0 19 9a7 7 0 0 0-7-7zm1 16.25a1.25 1.25 0 0 1-2.5 0V17h2.5v1.25z" />
        </svg>
      </div>
      <button
        style={{
          fontSize: 20,
          padding: '12px 32px',
          borderRadius: 8,
          border: 'none',
          background: isOn ? '#f44336' : '#4caf50',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
        onClick={() => setIsOn(!isOn)}
      >
        Bật/Tắt
      </button>
    </div>
  );
}
