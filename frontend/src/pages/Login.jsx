// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = import.meta.env.VITE_API_URL;

// export default function Login() {
//   const [isSignup, setIsSignup] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const isMobile = window.innerWidth <= 768;

//   const handleSubmit = async () => {
//     if (!email || !password || (isSignup && !name)) {
//       alert("Please fill all fields");
//       return;
//     }

//     const endpoint = isSignup
//       ? `${API}/api/auth/register`
//       : `${API}/api/auth/login`;

//     try {
//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Authentication failed");
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       alert("Authentication successful 🎉");
//       navigate("/home");
//     } catch (err) {
//       console.error(err);
//       alert("Network Error");
//     }
//   };

//   return (
//     <div
//       style={{
//         ...styles.page,
//         ...(isMobile && {
//           padding: "20px",
//         }),
//       }}
//     >
//       <div
//         style={{
//           ...styles.card,
//           ...(isMobile && {
//             width: "100%",
//             maxWidth: "360px",
//             padding: "30px 22px",
//           }),
//         }}
//       >
//         <h1
//           style={{
//             fontSize: isMobile ? "30px" : "36px",
//             marginBottom: "10px",
//             color: "#c62828",
//           }}
//         >
//           🩸 QuickDonor
//         </h1>

//         <p style={styles.subtitle}>
//           {isSignup ? "Create Account" : "Login to your account"}
//         </p>

//         {isSignup && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={styles.input}
//           />
//         )}

//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={styles.input}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />

//         <button
//           onClick={handleSubmit}
//           style={styles.btn}
//           onMouseOver={(e) => (e.target.style.background = "#c62828")}
//           onMouseOut={(e) => (e.target.style.background = "#111")}
//         >
//           {isSignup ? "Create Account" : "Login"}
//         </button>

//         <p style={styles.switchText} onClick={() => setIsSignup(!isSignup)}>
//           {isSignup
//             ? "Already have an account? Login"
//             : "Don't have an account? Sign Up"}
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#eef2f7",
//     boxSizing: "border-box",
//   },

//   card: {
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "16px",
//     width: "350px",
//     boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//     textAlign: "center",
//     boxSizing: "border-box",
//   },

//   subtitle: {
//     marginBottom: "20px",
//     color: "#666",
//     fontSize: "15px",
//   },

//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "15px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     boxSizing: "border-box",
//     fontSize: "15px",
//     outline: "none",
//   },

//   btn: {
//     width: "100%",
//     padding: "12px",
//     background: "#111",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     cursor: "pointer",
//     fontSize: "15px",
//     fontWeight: "600",
//     transition: "0.3s",
//   },

//   switchText: {
//     marginTop: "18px",
//     color: "#c62828",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "14px",
//   },
// };

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

      if (!res.ok) {
        alert(data.message || "Authentication failed");
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
    <div style={styles.page}>
      {/* Animated Background */}
      <div style={styles.overlay}></div>

      {/* Floating Circles */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>
      <div style={styles.circle3}></div>

      <div style={styles.container}>
        {/* Left Side */}
        <div style={styles.left}>
          <div style={styles.leftOverlay}>
            <h1 style={styles.heroTitle}>🩸 QuickDonor</h1>

            <p style={styles.heroText}>
              Donate Blood.
              <br />
              Save Lives.
            </p>

            <p style={styles.heroDesc}>
              Connect donors with patients instantly using live location, nearby
              donor search and emergency notifications.
            </p>

            <div style={styles.featureBox}>❤️ Trusted Community</div>

            <div style={styles.featureBox}>📍 Live Location Search</div>

            <div style={styles.featureBox}>⚡ Emergency Blood Requests</div>
          </div>
        </div>

        {/* Right Side */}
        <div style={styles.right}>
          <div style={styles.card}>
            <h2 style={styles.title}>
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <p style={styles.subtitle}>
              {isSignup ? "Create your donor account" : "Login to continue"}
            </p>

            {isSignup && (
              <input
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type="email"
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              style={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.button} onClick={handleSubmit}>
              {isSignup ? "Create Account" : "Login"}
            </button>

            <p style={styles.switch} onClick={() => setIsSignup(!isSignup)}>
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",

    backgroundImage:
      "linear-gradient(rgba(15,23,42,.55), rgba(15,23,42,.55)), url('https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80')",

    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",

    fontFamily: "Inter, sans-serif",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(198,40,40,.25), rgba(0,0,0,.45))",
  },

  circle1: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: "50%",
    background: "rgba(255,255,255,.12)",
    top: -80,
    left: -60,
    backdropFilter: "blur(10px)",
  },

  circle2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: "rgba(255,255,255,.08)",
    right: -50,
    bottom: 40,
  },

  circle3: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "rgba(198,40,40,.3)",
    right: "20%",
    top: "18%",
  },

  container: {
    width: "92%",
    maxWidth: "1200px",

    display: "flex",

    borderRadius: 28,

    overflow: "hidden",

    backdropFilter: "blur(18px)",

    background: "rgba(255,255,255,.08)",

    boxShadow: "0 30px 80px rgba(0,0,0,.35)",

    border: "1px solid rgba(255,255,255,.18)",

    zIndex: 2,
  },

  left: {
    flex: 1.1,

    minHeight: "720px",

    color: "white",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    padding: "70px",

    background:
      "linear-gradient(135deg, rgba(183,28,28,.70), rgba(198,40,40,.45))",
  },

  leftOverlay: {
    maxWidth: "480px",
  },

  heroTitle: {
    fontSize: "56px",

    marginBottom: "25px",

    fontWeight: "800",
  },

  heroText: {
    fontSize: "44px",

    lineHeight: "1.2",

    fontWeight: "700",

    marginBottom: "22px",
  },

  heroDesc: {
    fontSize: "18px",

    lineHeight: "1.8",

    color: "rgba(255,255,255,.9)",

    marginBottom: "35px",
  },

  featureBox: {
    marginBottom: "16px",

    padding: "18px",

    borderRadius: "16px",

    background: "rgba(255,255,255,.15)",

    backdropFilter: "blur(12px)",

    border: "1px solid rgba(255,255,255,.18)",

    fontWeight: "600",

    transition: ".35s",
  },

  right: {
    flex: 0.9,

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    padding: "60px",

    background: "rgba(255,255,255,.18)",
  },

  card: {
    width: "100%",

    maxWidth: "420px",

    padding: "45px",

    borderRadius: "24px",

    backdropFilter: "blur(25px)",

    background: "rgba(255,255,255,.88)",

    boxShadow: "0 20px 60px rgba(0,0,0,.18)",

    textAlign: "center",
  },

  title: {
    fontSize: "34px",

    color: "#c62828",

    marginBottom: "10px",
  },

  subtitle: {
    color: "#666",

    marginBottom: "30px",

    fontSize: "15px",
  },

  input: {
    width: "100%",

    padding: "15px",

    marginBottom: "18px",

    borderRadius: "12px",

    border: "1px solid #ddd",

    outline: "none",

    fontSize: "15px",

    boxSizing: "border-box",

    transition: ".3s",
  },

  button: {
    width: "100%",

    padding: "15px",

    border: "none",

    borderRadius: "14px",

    background: "linear-gradient(135deg,#d32f2f,#b71c1c)",

    color: "white",

    fontWeight: "700",

    fontSize: "16px",

    cursor: "pointer",

    transition: ".3s",
  },

  switch: {
    marginTop: "22px",

    color: "#c62828",

    cursor: "pointer",

    fontWeight: "600",
  },
  /* ==============================
        Mobile Responsive
  ============================== */

  "@media": {},
};

if (window.innerWidth <= 900) {
  styles.container = {
    ...styles.container,
    flexDirection: "column",
    width: "95%",
    maxWidth: "500px",
  };

  styles.left = {
    ...styles.left,
    minHeight: "280px",
    padding: "40px 30px",
    textAlign: "center",
  };

  styles.heroTitle = {
    ...styles.heroTitle,
    fontSize: "36px",
  };

  styles.heroText = {
    ...styles.heroText,
    fontSize: "28px",
  };

  styles.heroDesc = {
    ...styles.heroDesc,
    fontSize: "15px",
    marginBottom: "25px",
  };

  styles.featureBox = {
    ...styles.featureBox,
    fontSize: "14px",
    padding: "14px",
  };

  styles.right = {
    ...styles.right,
    padding: "25px",
  };

  styles.card = {
    ...styles.card,
    padding: "30px 22px",
  };

  styles.title = {
    ...styles.title,
    fontSize: "28px",
  };
}

if (window.innerWidth <= 600) {
  styles.page = {
    ...styles.page,
    padding: "20px",
    backgroundAttachment: "scroll",
  };

  styles.container = {
    ...styles.container,
    borderRadius: "20px",
  };

  styles.left = {
    ...styles.left,
    minHeight: "220px",
    padding: "25px 20px",
  };

  styles.heroTitle = {
    ...styles.heroTitle,
    fontSize: "30px",
  };

  styles.heroText = {
    ...styles.heroText,
    fontSize: "24px",
  };

  styles.heroDesc = {
    ...styles.heroDesc,
    display: "none",
  };

  styles.featureBox = {
    ...styles.featureBox,
    fontSize: "13px",
    padding: "12px",
    marginBottom: "10px",
  };

  styles.card = {
    ...styles.card,
    borderRadius: "18px",
    padding: "24px 18px",
  };

  styles.input = {
    ...styles.input,
    padding: "14px",
    fontSize: "16px",
  };

  styles.button = {
    ...styles.button,
    padding: "14px",
    fontSize: "16px",
  };

  styles.switch = {
    ...styles.switch,
    fontSize: "14px",
  };
}
