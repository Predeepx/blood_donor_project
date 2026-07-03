import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  // Hide completely on login page
  if (path === "/login") return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = path === "/home";
  const showNavbar = !isHomePage || scrolled;

  return (
    <nav
      style={{
        ...styles.navbar,
        opacity: showNavbar ? 1 : 0,
        transform: showNavbar ? "translateY(0px)" : "translateY(-30px)",
        pointerEvents: showNavbar ? "auto" : "none",
      }}
    >
      <button style={styles.logo} onClick={() => navigate("/home")}>
        🩸 QuickDonor
      </button>

      <div style={styles.links}>
        <button
          style={path === "/donor" ? styles.activeBtn : styles.btn}
          onClick={() => navigate("/donor")}
        >
          Become Donor
        </button>

        <button
          style={path === "/find-blood" ? styles.activeBtn : styles.btn}
          onClick={() => navigate("/find-blood")}
        >
          Find Blood
        </button>
        <button
          style={path === "/profile" ? styles.activeBtn : styles.btn}
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>

        <button style={styles.outlineBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </nav>
  );
}
const isMobile = window.innerWidth <= 768;

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    minHeight: isMobile ? "60px" : "70px",
    padding: isMobile ? "10px 16px" : "0 80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: isMobile ? "wrap" : "nowrap",

    backdropFilter: "blur(16px)",
    background: "rgba(255,255,255,0.75)",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",

    zIndex: 9999,
    boxSizing: "border-box",

    transition:
      "opacity .4s ease, transform .4s cubic-bezier(.22,1,.36,1)",
  },

  logo: {
    background: "transparent",
    border: "none",
    fontSize: isMobile ? "22px" : "29px",
    fontWeight: "700",
    color: "#c62828",
    cursor: "pointer",
    letterSpacing: ".5px",
    marginBottom: isMobile ? "8px" : "0",
  },

  links: {
    display: "flex",
    gap: isMobile ? "8px" : "18px",
    flexWrap: isMobile ? "wrap" : "nowrap",
    justifyContent: isMobile ? "center" : "flex-end",
    width: isMobile ? "100%" : "auto",
  },

  btn: {
    background: "transparent",
    border: "none",
    padding: isMobile ? "8px 10px" : "8px 14px",
    fontWeight: "600",
    cursor: "pointer",
    borderRadius: "8px",
    transition: ".3s",
    color: "#333",
    fontSize: isMobile ? "13px" : "15px",
  },

  activeBtn: {
    background: "#c62828",
    color: "#fff",
    border: "none",
    padding: isMobile ? "8px 10px" : "8px 16px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: isMobile ? "13px" : "15px",
  },

  outlineBtn: {
    background: "transparent",
    border: "1px solid #c62828",
    color: "#c62828",
    padding: isMobile ? "8px 10px" : "8px 16px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: ".3s",
    fontSize: isMobile ? "13px" : "15px",
  },
};