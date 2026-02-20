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
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
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
  const [availability, setAvailability] = useState(true);

  /* Auto detect location on load */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {}
      );
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    if (!position) return alert("Select your location");

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5001/api/donors/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...form,
            latitude: position[0],
            longitude: position[1],
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert("Donor registered successfully 🩸");

      setForm({
        name: "",
        bloodGroup: "",
        phone: "",
        city: "",
      });
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

          <form onSubmit={handleSubmit}>
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

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register Now"}
            </button>
          </form>
        </div>

        <div className="donor-map">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="map"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
            <AutoCenter />
          </MapContainer>
        </div>
      </div>
    </>
  );
}
