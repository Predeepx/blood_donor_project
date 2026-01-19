import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={{ ...styles.welcome, marginTop: "90px" }}>
          Welcome to QuickDonor Dashboard 🩸
        </h1>
        <p style={styles.subtitle}>
          Connecting blood donors with those in need — fast, safe, and reliable.
        </p>

        <div style={styles.cardContainer}>
          <div style={styles.card} onClick={() => navigate("/donor")}>
            <h3>🩸 Become a Donor</h3>
            <p>Register yourself and help save lives.</p>
          </div>

          <div style={styles.card} onClick={() => navigate("/find-blood")}>
            <h3>🏥 Find Blood</h3>
            <p>Search for available donors near you.</p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  welcome: {
    color: "red",
  },
  title: {
    color: "red",
    fontSize: "36px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "40px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    width: "260px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.3s",
  },
};
