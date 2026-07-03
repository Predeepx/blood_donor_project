import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

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

      setUser(res.data);
      setForm(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

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
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <h2>Loading Profile...</h2>
        </div>
      </>
    );

  if (!user) return null;

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          {/* HEADER */}

          <div style={styles.header}>
            <div style={styles.avatar}>
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h1 style={styles.name}>{user.name}</h1>

            <p style={styles.email}>{user.email}</p>

            <span style={styles.badge}>
              🩸 {user.bloodGroup || "Blood Group Not Set"}
            </span>
          </div>

          {/* PERSONAL INFO */}

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>

            <InfoRow label="Full Name" value={user.name || "-"} />

            <InfoRow label="Email" value={user.email} />

            <InfoRow label="Phone" value={user.phone || "Not Available"} />

            <InfoRow label="City" value={user.city || "Not Available"} />

            <InfoRow label="Blood Group" value={user.bloodGroup || "-"} />

            <InfoRow
              label="Member Since"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"
              }
            />
          </div>

          {/* STATS */}

          <div style={styles.statsContainer}>
            <StatCard
              title="Blood Donations"
              value={user.donationHistory?.length || 0}
            />

            <StatCard
              title="Lives Helped"
              value={(user.donationHistory?.length || 0) * 3}
            />
          </div>

          {/* BUTTONS */}

          <div style={styles.buttonRow}>
            <button style={styles.editBtn} onClick={() => setEditing(true)}>
              ✏ Edit Profile
            </button>

            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}

      {editing && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Edit Profile</h2>
            <input
              style={styles.input}
              placeholder="Full Name"
              value={form.name || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
            <input
              style={styles.input}
              placeholder="Phone"
              value={form.phone || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />
            <input
              style={styles.input}
              placeholder="City"
              value={form.city || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
            />
            <select
              style={styles.input}
              value={form.bloodGroup || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  bloodGroup: e.target.value,
                })
              }
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
            {/* Part 2 continues here */}{" "}
            <div style={styles.modalButtons}>
              <button
                style={styles.saveBtn}
                onClick={saveProfile}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() => setEditing(false)}
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

function InfoRow({ label, value }) {
  return (
    <div style={styles.infoRow}>
      <span style={styles.label}>{label}</span>
      <span style={styles.value}>{value}</span>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={styles.statCard}>
      <h1 style={styles.statNumber}>{value}</h1>
      <p style={styles.statTitle}>{title}</p>
    </div>
  );
}

const isMobile = window.innerWidth < 768;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb",
    padding: isMobile ? "90px 15px" : "120px 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  loading: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  spinner: {
    width: 60,
    height: 60,
    border: "6px solid #ddd",
    borderTop: "6px solid #d32f2f",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  card: {
    width: "100%",
    maxWidth: 750,
    background: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 15px 40px rgba(0,0,0,.08)",
  },

  header: {
    background: "linear-gradient(135deg,#c62828,#ff5a5a)",
    color: "#fff",
    padding: isMobile ? 30 : 45,
    textAlign: "center",
  },

  avatar: {
    width: isMobile ? 85 : 110,
    height: isMobile ? 85 : 110,
    borderRadius: "50%",
    background: "#fff",
    color: "#c62828",
    fontWeight: "bold",
    fontSize: isMobile ? 34 : 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },

  name: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: isMobile ? 28 : 36,
  },

  email: {
    opacity: 0.9,
    marginBottom: 20,
    wordBreak: "break-word",
  },

  badge: {
    background: "rgba(255,255,255,.2)",
    padding: "10px 18px",
    borderRadius: 30,
    fontWeight: "bold",
  },

  section: {
    padding: isMobile ? 20 : 35,
  },

  sectionTitle: {
    marginBottom: 20,
    fontSize: 22,
    color: "#333",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: isMobile ? "flex-start" : "center",
    flexDirection: isMobile ? "column" : "row",
    padding: "16px 0",
    borderBottom: "1px solid #eee",
    gap: 5,
  },

  label: {
    color: "#555",
    fontWeight: 600,
  },

  value: {
    color: "#777",
    textAlign: isMobile ? "left" : "right",
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: 20,
    padding: "0 35px 35px",
  },

  statCard: {
    background: "#fafafa",
    borderRadius: 15,
    padding: 25,
    textAlign: "center",
  },

  statNumber: {
    color: "#c62828",
    margin: 0,
    fontSize: 40,
  },

  statTitle: {
    color: "#666",
    marginTop: 10,
  },

  buttonRow: {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: 15,
    padding: "0 35px 35px",
  },

  editBtn: {
    flex: 1,
    background: "#111",
    color: "#fff",
    border: "none",
    padding: 15,
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 16,
  },

  logoutBtn: {
    flex: 1,
    background: "#c62828",
    color: "#fff",
    border: "none",
    padding: 15,
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 16,
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 999,
  },

  modal: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    borderRadius: 20,
    padding: 30,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  input: {
    padding: 14,
    border: "1px solid #ddd",
    borderRadius: 10,
    fontSize: 15,
  },

  modalButtons: {
    display: "flex",
    gap: 10,
    flexDirection: isMobile ? "column" : "row",
  },

  saveBtn: {
    flex: 1,
    background: "#c62828",
    color: "#fff",
    border: "none",
    padding: 14,
    borderRadius: 10,
    cursor: "pointer",
  },

  cancelBtn: {
    flex: 1,
    background: "#ddd",
    border: "none",
    padding: 14,
    borderRadius: 10,
    cursor: "pointer",
  },
};
