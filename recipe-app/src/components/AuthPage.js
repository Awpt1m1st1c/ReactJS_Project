import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (isLogin) {
    localStorage.setItem('loggedIn', 'true');
    alert(`Logging in as ${form.email}`);
    navigate("/home"); // Use React Router navigation
  } else {
    alert(`Registering ${form.name} with email ${form.email}`);
  }
};

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Recipe App</h2>
      <div style={{
        maxWidth: 350,
        margin: "40px auto",
        padding: 24,
        border: "1px solid black",
        borderRadius: 8,
        backgroundColor: "#e6d9d2ff"
      }}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: "100%", marginBottom: 16 }}
              />
            </div>
          )}
          <div>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: 16, height: 25 }}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: 16, height: 25 }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 8,
              color: "#000000ff",
              backgroundColor: "#a6e7c1ff",
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            marginTop: 12,
            width: "100%",
            background: "none",
            border: "none",
            color: "#01356fff",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
