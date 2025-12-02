import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";

function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/signin`, formData, {
        headers: { "Content-Type": "application/json" }
      });

      // backend currently returns { message: "Login successful" }
      // Save username locally so UI can use it (or save token if you add JWT)
      localStorage.setItem("username", formData.username);

      // Optionally store message
      setError("");
      navigate("/search");
    } catch (err) {
      // show message from backend if present
      const msg =
        err.response?.data?.message ||
        "Invalid username or password or server error.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          {error && <p className="error-box" role="alert">{error}</p>}

          <div className="input-box">
            <i className="bx bxs-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
