import Navbar from "../components/Navbar";
import { useState } from "react";

export default function FindBlood() {
  const [search, setSearch] = useState({
    bloodGroup: "",
    city: "",
  });

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.bloodGroup || !search.city) {
      alert("Please select blood group and city");
      return;
    }

    console.log("Searching for:", search);

    // Later → Fetch from Firestore
    alert("Search functionality will connect to database soon 🔎");
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>🏥 Find Blood Donors</h1>
        <p style={styles.subtitle}>Search for available donors near you.</p>

        <form style={styles.card} onSubmit={handleSearch}>
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
            name="city"
            placeholder="Enter City"
            onChange={handleChange}
            style={styles.input}
          />

          <button style={styles.btn}>Search Donors</button>
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
