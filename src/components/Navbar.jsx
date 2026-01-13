export default function Navbar() {
  return (
    <div style={styles.nav}>
      <h2 style={styles.h2}>🩸QuickDonor</h2>

      <div style={styles.links}>
        <button style={StyleSheet.btn}>Profile</button>
        <button style={StyleSheet.btn}>About</button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    height: "56px",
    background: "white",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 85px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  btn: {
    background: "white",
    color: "#c62828",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  h2: {
    fontSize: "24px",
    color: "red",
  },
};
