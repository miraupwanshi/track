import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocateTrack = () => {
  const [location, setLocation] = useState(null);
  const vehicleId = "TRUCK234"; // You can make this dynamic

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://locationtracker-m9ig.onrender.com/api/latest-location/${vehicleId}`);
        setLocation(response.data);
      } catch (error) {
        console.error("Failed to fetch location:", error.message);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>Live Truck Location</h2>
      {location && (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "90%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              {location.vehicleId}<br />
              {new Date(location.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default LocateTrack;
