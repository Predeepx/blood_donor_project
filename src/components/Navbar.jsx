export default function Navbar() {
  return (
    <div style={styles.nav}>
      <h2 style={styles.h2}>🩸QuickDonor</h2>

      <div style={styles.links}>
        <button style={styles.btn}>Profile</button>
        <button style={styles.btn}>About</button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    height: "56px",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 85px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    boxSizing: "border-box",
    zIndex: 1000,
  },

  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  btn: {
    // background: "transparent",
    // color: "white",
    border: "1px solid rgba(255,255,255,0.6)",
    padding: "8px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },
  h2: {
    fontSize: "24px",
    color: "red",
  },
};
