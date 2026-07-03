import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 768;

  const handleSubmit = async () => {
    if (!email || !password || (isSignup && !name)) {
      alert("Please fill all fields");
      return;
    }

    const endpoint = isSignup
      ? `${API}/api/auth/register`
      : `${API}/api/auth/login`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Authentication failed");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Authentication successful 🎉");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Network Error");
    }
  };

  return (
    <div
      style={{
        ...styles.page,
        ...(isMobile && {
          padding: "20px",
        }),
      }}
    >
      <div
        style={{
          ...styles.card,
          ...(isMobile && {
            width: "100%",
            maxWidth: "360px",
            padding: "30px 22px",
          }),
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "30px" : "36px",
            marginBottom: "10px",
            color: "#c62828",
          }}
        >
          🩸 QuickDonor
        </h1>

        <p style={styles.subtitle}>
          {isSignup ? "Create Account" : "Login to your account"}
        </p>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleSubmit}
          style={styles.btn}
          onMouseOver={(e) => (e.target.style.background = "#c62828")}
          onMouseOut={(e) => (e.target.style.background = "#111")}
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        <p style={styles.switchText} onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2f7",
    boxSizing: "border-box",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    width: "350px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
    boxSizing: "border-box",
  },

  subtitle: {
    marginBottom: "20px",
    color: "#666",
    fontSize: "15px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "15px",
    outline: "none",
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "0.3s",
  },

  switchText: {
    marginTop: "18px",
    color: "#c62828",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
};
