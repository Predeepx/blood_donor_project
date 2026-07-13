import { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import { searchDonors } from "../../api/donor.api";

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

/* ===============================
   FIX LEAFLET ICONS
================================= */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

/* ===============================
   USER LOCATION ICON
================================= */
const finderIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [35, 35],
});

/* ===============================
   COMPONENT
================================= */
export default function FindBlood() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [userPosition, setUserPosition] = useState(null);
  const [donors, setDonors] = useState([]);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===============================
     GET USER LOCATION
  ================================= */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error(err);
      },
    );
  }, []);

  /* ===============================
     AUTO SEARCH
  ================================= */
  useEffect(() => {
    if (bloodGroup && userPosition) {
      fetchDonors();
    }
  }, [bloodGroup, nearbyOnly, userPosition]);

  /* ===============================
     FETCH DONORS
  ================================= */
  const fetchDonors = async () => {
    try {
      setLoading(true);

      const response = await searchDonors({
        bloodGroup,
        latitude: userPosition[0],
        longitude: userPosition[1],
        nearbyOnly,
      });

      setDonors(response.data || []);
    } catch (error) {
      console.error("Donor Search Error:", error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     LOCATION SEARCH
  ================================= */
  const handleLocationSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`,
      );

      const data = await res.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        setUserPosition([lat, lon]);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error(error);
      alert("Search failed");
    }
  };

  /* ===============================
     DISTANCE CALCULATION
  ================================= */
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;

    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2);
  };

  /* ===============================
     MAP AUTO ZOOM
  ================================= */
  function AutoZoom() {
    const map = useMap();

    if (userPosition) {
      map.setView(userPosition, 13);
    }

    return null;
  }

  /* ===============================
     LOCATION PICKER
  ================================= */
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
    if (!phone) return "";
    if (phone.startsWith("+")) return phone;
    return `+91${phone}`;
  };

  const createWhatsAppLink = (donor) => {
    const phone = formatPhone(donor.phone).replace("+", "");

    const message = encodeURIComponent(
      `🚨 Emergency Blood Request

Blood Group Required: ${donor.bloodGroup}

Location:
https://www.google.com/maps?q=${userPosition?.[0]},${userPosition?.[1]}

Please respond if available.

QuickDonor`,
    );

    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <>
      <Navbar />

      <div className="finder-container">
        <div className="finder-panel">
          <h2>Find Blood Donors</h2>

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

          {loading && <p>Searching donors...</p>}
        </div>

        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <LocationMarker />
          <AutoZoom />

          {donors.map((donor) => {
            if (!donor.location?.coordinates) return null;

            const lat = donor.location.coordinates[1];

            const lng = donor.location.coordinates[0];

            const distance =
              userPosition &&
              getDistance(userPosition[0], userPosition[1], lat, lng);

            return (
              <Marker key={donor._id} position={[lat, lng]}>
                <Popup>
                  <div className="popup-card">
                    <h4>{donor.user?.name || donor.name}</h4>

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
