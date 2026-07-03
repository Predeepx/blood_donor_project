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
        <h1 style={styles.title(isMobile)}>🩸 QuickDonor</h1>

        <p style={styles.subtitle(isMobile)}>
          {isSignup
            ? "Create your QuickDonor account"
            : "Login to your account"}
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
  page: (mobile) => ({
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2f7",
    padding: mobile ? "20px" : "0",
    boxSizing: "border-box",
  }),

  card: (mobile) => ({
    width: mobile ? "100%" : "350px",
    maxWidth: "420px",
    background: "#fff",
    padding: mobile ? "28px 22px" : "40px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
    boxSizing: "border-box",
  }),

  title: (mobile) => ({
    fontSize: mobile ? "30px" : "36px",
    marginBottom: "10px",
    color: "#c62828",
  }),

  subtitle: (mobile) => ({
    color: "#666",
    marginBottom: "25px",
    fontSize: mobile ? "15px" : "16px",
  }),

  input: (mobile) => ({
    width: "100%",
    padding: mobile ? "14px" : "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  }),

  btn: (mobile) => ({
    width: "100%",
    padding: mobile ? "14px" : "12px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: mobile ? "16px" : "15px",
    transition: "0.3s",
  }),

  switchText: (mobile) => ({
    marginTop: "20px",
    color: "#c62828",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: mobile ? "15px" : "14px",
  }),
};
