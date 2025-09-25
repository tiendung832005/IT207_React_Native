import React, { useState } from "react";

type CurrencyInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

function CurrencyInput({ label, value, onChange }: CurrencyInputProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ fontSize: 18, fontWeight: "bold", marginRight: 12 }}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          fontSize: 18,
          padding: "8px 16px",
          borderRadius: 8,
          border: "1px solid #ccc",
          width: 180,
        }}
      />
    </div>
  );
}

const RATE = 25000;

export default function Bai5() {
  const [vnd, setVnd] = useState(0);
  const [usd, setUsd] = useState(0);

  // Xử lý khi nhập VND
  const handleVndChange = (value: number) => {
    setVnd(value);
    setUsd(Number((value / RATE).toFixed(2)));
  };

  // Xử lý khi nhập USD
  const handleUsdChange = (value: number) => {
    setUsd(value);
    setVnd(Number((value * RATE).toFixed(0)));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      <h2>Chuyển đổi tiền tệ VND &lt;-&gt; USD</h2>
      <CurrencyInput label="VND" value={vnd} onChange={handleVndChange} />
      <CurrencyInput label="USD" value={usd} onChange={handleUsdChange} />
      <div style={{ marginTop: 24, color: "#888" }}>
        (Tỉ giá: 1 USD = 25,000 VND)
      </div>
    </div>
  );
}
