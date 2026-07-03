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
        alert(`Error ${res.status}: ${data.message}`);
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
    <div style={styles.page(isMobile)}>
      <div style={styles.card(isMobile)}>
        <h1
          style={{
            fontSize: window.innerWidth <= 768 ? "30px" : "36px",
            marginBottom: "10px",
          }}
        >
          🩸 QuickDonor
        </h1>

        <p
          style={{
            marginBottom: "20px",
            color: "#666",
          }}
        >
          {isSignup ? "Create Account" : "Login to your account"}
        </p>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input(isMobile)}
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input(isMobile)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input(isMobile)}
        />

        <button onClick={handleSubmit} style={styles.btn(isMobile)}>
          {isSignup ? "Create Account" : "Login"}
        </button>

        <p
          style={styles.switchText(isMobile)}
          onClick={() => setIsSignup(!isSignup)}
        >
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
    padding: window.innerWidth <= 768 ? "20px" : "0",
    boxSizing: "border-box",
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    width: window.innerWidth <= 768 ? "100%" : "350px",
    maxWidth: "350px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
    boxSizing: "border-box",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: window.innerWidth <= 768 ? "16px" : "15px",
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: window.innerWidth <= 768 ? "16px" : "15px",
    fontWeight: "600",
  },
};
