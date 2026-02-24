import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "./Donor.css";

/* Fix Leaflet icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function Donor() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    city: "",
  });

  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showEligibility, setShowEligibility] = useState(false);
  const [eligible, setEligible] = useState(false);

  /* Auto detect location */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {},
      );
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    if (!position) return alert("Select your location");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/donors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          latitude: position[0],
          longitude: position[1],
        }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert("Donor registered successfully 🩸");

      setForm({
        name: "",
        bloodGroup: "",
        phone: "",
        city: "",
      });

      setEligible(false);
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return position ? <Marker position={position} /> : null;
  }

  function AutoCenter() {
    const map = useMap();
    if (position) map.setView(position, 13);
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="donor-container">
        <div className="donor-form">
          <h2>Become a Blood Donor</h2>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            required
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
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

          <button type="button" onClick={() => setShowEligibility(true)}>
            Register
          </button>
        </div>

        {/* MAP */}
        <div className="donor-map">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
            <AutoCenter />
          </MapContainer>
        </div>
      </div>

      {/* ===== ELIGIBILITY MODAL ===== */}
      {showEligibility && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">Blood Donation Eligibility</div>

            <div className="modal-body">
              {[
                "I am between 18 and 60 years old",
                "My weight is at least 50kg",
                "I have not donated blood in last 90 days",
                "No tattoo or piercing in last 6 months",
                "No major surgery in last 6 months",
                "Not infected with HIV/Hepatitis",
                "Not pregnant or breastfeeding",
                "Not currently sick or fever",
                "No alcohol in last 24 hours",
                "Not taking antibiotics",
              ].map((item, index) => (
                <div key={index} className="checkbox-row">
                  <input type="checkbox" />
                  <span>{item}</span>
                </div>
              ))}

              <div className="checkbox-row confirm">
                <input
                  type="checkbox"
                  checked={eligible}
                  onChange={(e) => setEligible(e.target.checked)}
                />
                <span>
                  <strong>I confirm I meet ALL the above criteria</strong>
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowEligibility(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                disabled={!eligible}
                onClick={() => {
                  setShowEligibility(false);
                  handleSubmit();
                }}
              >
                Confirm & Register
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
