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
const API = import.meta.env.VITE_API_URL;

/* Fix Leaflet icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",

  // https://app.unpkg.com/leaflet@1.7.1/files/dist/images file path for images
});

export default function Donor() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    city: "",
  });

  const [position, setPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);
  const [eligible, setEligible] = useState(false);

  /* Auto detect location */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* Modern Search with hospital support */
  const handleLocationSearch = async () => {
    if (!searchQuery) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`,
      );
      const data = await res.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);

        if (
          data[0].type === "hospital" ||
          data[0].display_name.toLowerCase().includes("hospital")
        ) {
          alert("🏥 Hospital location selected");
        }
      } else {
        alert("Location not found");
      }
    } catch {
      alert("Search failed");
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");
    if (!position) return alert("Select your location");

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/donors/register`, {
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

      setForm({ name: "", bloodGroup: "", phone: "", city: "" });
      setEligible(false);
    } catch {
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
          />
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
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
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

          <button type="button" onClick={handleSubmit}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        {/* MAP */}
        <div className="donor-map">
          {/* Modern Search Bar */}
          <div className="map-search">
            <input
              type="text"
              placeholder="Search city, hospital, blood bank..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleLocationSearch}>Search</button>
          </div>

          <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
            <AutoCenter />
          </MapContainer>
        </div>
      </div>
    </>
  );
}
