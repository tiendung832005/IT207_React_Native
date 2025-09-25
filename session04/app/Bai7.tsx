import React, { useState } from "react";

function validateEmail(email: string) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

export default function Bai7() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Xác thực từng trường
  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        return value.trim() === "" ? "Tên không được để trống." : "";
      case "email":
        return !validateEmail(value) ? "Email không đúng định dạng." : "";
      case "password":
        return value.length < 6 ? "Mật khẩu phải ít nhất 6 ký tự." : "";
      case "confirmPassword":
        return value !== form.password ? "Xác nhận mật khẩu không khớp." : "";
      default:
        return "";
    }
  };

  // Khi blur input
  const handleBlur = (field: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, form[field as keyof typeof form]),
    }));
  };

  // Khi thay đổi input
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Nếu đã có lỗi, kiểm tra lại khi nhập
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  // Kiểm tra toàn bộ form hợp lệ
  const isValid =
    form.name.trim() !== "" &&
    validateEmail(form.email) &&
    form.password.length >= 6 &&
    form.confirmPassword === form.password &&
    Object.values(errors).every((e) => e === "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đăng ký thành công!");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <h2>Đăng ký người dùng</h2>
      <form
        style={{
          width: 340,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div style={{ marginBottom: 18 }}>
          <input
            type="text"
            placeholder="Tên"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            style={{
              fontSize: 17,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {errors.name}
            </div>
          )}
        </div>
        <div style={{ marginBottom: 18 }}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            style={{
              fontSize: 17,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          {errors.email && (
            <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {errors.email}
            </div>
          )}
        </div>
        <div style={{ marginBottom: 18 }}>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            style={{
              fontSize: 17,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          {errors.password && (
            <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {errors.password}
            </div>
          )}
        </div>
        <div style={{ marginBottom: 18 }}>
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            style={{
              fontSize: 17,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          {errors.confirmPassword && (
            <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {errors.confirmPassword}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          style={{
            fontSize: 18,
            padding: "10px 32px",
            borderRadius: 8,
            border: "none",
            background: isValid ? "#1976d2" : "#aaa",
            color: "#fff",
            cursor: isValid ? "pointer" : "not-allowed",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
