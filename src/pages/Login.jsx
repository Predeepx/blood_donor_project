import { useState } from "react";
import { auth, googleProvider } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Home");
    } catch (error) {
      if (error.code === "Mail or Passward incorrect") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/Home");
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert(error.message);
      }
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🩸 QuickDonor</h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={login} style={styles.btn}>
          Get Started
        </button>

        <p>or</p>

        <button onClick={googleLogin} style={styles.google}>
          Sign in with Google
        </button>
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
  google: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    cursor: "pointer",
    background: "white",
  },
};
