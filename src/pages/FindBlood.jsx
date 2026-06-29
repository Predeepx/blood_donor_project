
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "./FindBlood.css";

/* Fix Leaflet icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

/* Finder Blue Icon */
const finderIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [35, 35],
});

export default function FindBlood() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [userPosition, setUserPosition] = useState(null);
  const [donors, setDonors] = useState([]);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* Auto detect finder location */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  /* Auto search donors */
  useEffect(() => {
    if (bloodGroup) fetchDonors();
  }, [bloodGroup, nearbyOnly, userPosition]);

  const fetchDonors = async () => {
    const res = await fetch("http://localhost:5001/api/donors/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bloodGroup,
        latitude: userPosition?.[0],
        longitude: userPosition?.[1],
        nearbyOnly,
      }),
    });

    const data = await res.json();
    setDonors(data);
  };

  /* Search hospital / location */
  const handleLocationSearch = async () => {
    if (!searchQuery) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        setUserPosition([lat, lon]);

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

  /* Distance calculator using Haversine formula*/
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  function AutoZoom() {
    const map = useMap();
    if (userPosition) map.setView(userPosition, 15);
    return null;
  }

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setUserPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return userPosition ? (
      <Marker position={userPosition} icon={finderIcon}>
        <Popup>Your Location 📍</Popup>
      </Marker>
    ) : null;
  }

  const formatPhone = (phone) => {
    if (phone.startsWith("+")) return phone;
    return `+91${phone}`;
  };

  const createWhatsAppLink = (donor) => {
    const phone = formatPhone(donor.phone).replace("+", "");
    const message = encodeURIComponent(
      `🚨 Emergency Blood Request\n\nBlood Group Required: ${
        donor.bloodGroup
      }\nLocation: https://www.google.com/maps?q=${
        userPosition?.[0]
      },${userPosition?.[1]}\n\nPlease respond if available.\n\nQuickDonor`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <>
      <Navbar />

      <div className="finder-container">
        <div className="finder-panel">
          <h2>Find Blood Donors</h2>

          {/* Modern Search Bar */}
          <div className="map-search">
            <input
              type="text"
              placeholder="Search hospital or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleLocationSearch}>Search</button>
          </div>

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
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

          <label className="checkbox">
            <input
              type="checkbox"
              checked={nearbyOnly}
              onChange={() => setNearbyOnly(!nearbyOnly)}
            />
            Show Nearby Only (10km)
          </label>
        </div>

        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <LocationMarker />
          <AutoZoom />

          {donors.map((donor) => {
            const distance =
              userPosition &&
              getDistance(
                userPosition[0],
                userPosition[1],
                donor.location.coordinates[1],
                donor.location.coordinates[0]
              );

            return (
              <Marker
                key={donor._id}
                position={[
                  donor.location.coordinates[1],
                  donor.location.coordinates[0],
                ]}
              >
                <Popup>
                  <div className="popup-card">
                    <h4>{donor.name}</h4>

                    <p>🩸 {donor.bloodGroup}</p>

                    {distance && <p>📍 {distance} km away</p>}

                    <a
                      href={`tel:${formatPhone(donor.phone)}`}
                      className="call-btn full-btn"
                    >
                      📞 Call Now
                    </a>

                    <a
                      href={createWhatsAppLink(donor)}
                      target="_blank"
                      rel="noreferrer"
                      className="wa-btn full-btn"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}