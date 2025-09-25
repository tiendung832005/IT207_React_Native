import React from 'react';

type UserInfoCardProps = {
  name: string;
  avatarUrl: string;
  email: string;
};

export function UserInfoCard({ name, avatarUrl, email }: UserInfoCardProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      background: '#fff',
      marginBottom: 16,
      maxWidth: 350
    }}>
      <img
        src={avatarUrl}
        alt={name}
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          objectFit: 'cover',
          marginRight: 16,
          border: '2px solid #eee'
        }}
      />
      <div>
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>{name}</div>
        <div style={{ color: '#555', fontSize: 15 }}>{email}</div>
      </div>
    </div>
  );
}
