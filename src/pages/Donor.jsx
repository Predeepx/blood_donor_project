import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Donor() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.bloodGroup || !form.phone || !form.city) {
      alert("Please fill all fields");
      return;
    }

    console.log("Donor Data:", form);
    alert("Donor Registered Successfully 🩸");

    // later → save to Firebase
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>🩸 Become a Blood Donor</h1>
        <p style={styles.subtitle}>
          Your single donation can save multiple lives.
        </p>

        <form style={styles.card} onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="bloodGroup"
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="city"
            placeholder="City / Location"
            onChange={handleChange}
            style={styles.input}
          />

          <button style={styles.btn}>Register as Donor</button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    paddingTop: "100px",
    minHeight: "100vh",
    background: "#f9f9f9",
    textAlign: "center",
  },
  title: {
    color: "#c62828",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#555",
    marginBottom: "30px",
  },
  card: {
    width: "360px",
    margin: "auto",
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  btn: {
    padding: "12px",
    background: "#c62828",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
