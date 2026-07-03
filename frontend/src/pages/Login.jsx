import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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

      // 🔥 Show backend error message
      if (!res.ok) {
        console.log("Status Code:", res.status);
        console.log("Backend Message:", data);

        alert(`Error ${res.status}: ${data.message || JSON.stringify(data)}`);
        return;
      }

      // Success
      localStorage.setItem("token", data.token);
      alert("Authentication successful 🎉");
      navigate("/home");
    } catch (err) {
      console.error("Network / Server Error:", err);
      alert("Network error: " + err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🩸 QuickDonor</h1>
        <p>{isSignup ? "Create Account" : "Login to your account"}</p>

        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        )}

        <input
          type="email"
          placeholder="Email"
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

        <button onClick={handleSubmit} style={styles.btn}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          style={{ marginTop: "15px", cursor: "pointer", color: "#c62828" }}
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
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2f7",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    width: "350px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};
