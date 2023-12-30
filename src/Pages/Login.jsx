import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      const { token } = response.data;

      setToken(token);
      navigate("/home");
      console.log("Login successful. Token:", token);
    } catch (error) {
      alert("Login failed: please check your credentials");
      console.error("Login failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Login</h1>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label style={styles.label}>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.input}
          />
        </label>
        <button style={styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Center content vertically
    height: "90vh", // Full viewport height
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "300px",
  },
  label: {
    marginBottom: "10px",
    textAlign: "left",
  },
  input: {
    padding: "8px",
    marginTop: "5px",
    width: "100%",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
  },
};

export default Login;
