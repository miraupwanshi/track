import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import truckIconImg from "./assets/placehold.png"; // Place this image in src/assets/

// Fix leaflet default marker icon bug (optional for fallback)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: truckIconImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30]
});

const LocateTrack = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (!tracking || !vehicleId) return;

    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `https://locationtracker-m9ig.onrender.com/api/latest-location/${vehicleId}`
        );
        setLocation(response.data);
        console.log("Fetched location:", response.data);
      } catch (error) {
        console.error("Failed to fetch location:", error.message);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval);
  }, [tracking, vehicleId]);

  return (
    <div style={{ height: "100vh", padding: 10 }}>
      <h2 style={{ textAlign: "center" }}>Live Truck Location Tracker</h2>

      <div style={{ marginBottom: 10, textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter Vehicle ID (e.g., TRUCK234)"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
        <button
          onClick={() => setTracking(!tracking)}
          style={{
            marginLeft: 10,
            padding: "8px 16px",
            fontSize: 16,
            backgroundColor: tracking ? "#f44336" : "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          {tracking ? "Stop Tracking" : "Start Tracking"}
        </button>
      </div>

      {location && location.latitude && location.longitude ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "85%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[location.latitude, location.longitude]}
            icon={truckIcon}
          >
            <Popup>
              <b>{location.vehicleId}</b><br />
              {new Date(location.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        tracking && <p style={{ textAlign: "center" }}>Fetching location...</p>
      )}
    </div>
  );
};

export default LocateTrack;
