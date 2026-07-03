import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Profile Response:", res.data);

      setUser(res.data);
      setForm(res.data);
    } catch (err) {
      console.error("Profile Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
      }

      alert("Profile request failed");

      // Uncomment these after debugging
      // localStorage.removeItem("token");
      // navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditing(false);
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div style={{ marginTop: 150 }}>Loading...</div>;
  if (!user) return null;

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.avatar}>
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{user.name}</h2>
              <p style={{ color: "#666" }}>{user.email}</p>
            </div>
          </div>

          <div style={styles.section}>
            <Row label="Blood Group" value={user.bloodGroup || "Not set"} />
            <Row label="Phone" value={user.phone || "Not set"} />
            <Row label="City" value={user.city || "Not set"} />
            <Row
              label="Member Since"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>

          <div style={styles.stats}>
            <Stat
              title="Total Donations"
              value={user.donationHistory?.length || 0}
            />
            <Stat
              title="Lives Impacted"
              value={(user.donationHistory?.length || 0) * 3}
            />
          </div>

          <div style={styles.buttons}>
            <button onClick={() => setEditing(true)} style={styles.editBtn}>
              Edit Profile
            </button>

            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {editing && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Profile</h3>

            <input
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
            />

            <input
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
            />

            <input
              value={form.city || ""}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="City"
            />

            <input
              value={form.bloodGroup || ""}
              onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
              placeholder="Blood Group"
            />

            <div style={{ marginTop: 20 }}>
              <button onClick={saveProfile} style={styles.saveBtn}>
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, value }) {
  return (
    <div style={styles.row}>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div style={styles.statCard}>
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 120,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: 450,
    padding: 40,
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    background: "#c62828",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginTop: 25,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 25,
  },
  statCard: {
    background: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    width: "45%",
    textAlign: "center",
  },
  buttons: {
    marginTop: 30,
    display: "flex",
    justifyContent: "space-between",
  },
  editBtn: {
    background: "#111",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
  },
  logoutBtn: {
    background: "#c62828",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: 30,
    borderRadius: 15,
    width: 350,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  saveBtn: {
    background: "#c62828",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: 6,
    marginRight: 10,
  },
  cancelBtn: {
    background: "#aaa",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: 6,
  },
};
