import React, { useState, useEffect, useRef } from "react";

const LocationTracker = ({ onLocationUpdate }) => {
	const [location, setLocation] = useState({ lat: null, lng: null });
	const watchIdRef = useRef(null);

	useEffect(() => {
		if (navigator.geolocation) {
			watchIdRef.current = navigator.geolocation.watchPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ lat: latitude, lng: longitude });
					onLocationUpdate({ lat: latitude, lng: longitude });
				},
				(error) => {
					console.error("Geolocation error:", error);
				},
				{
					enableHighAccuracy: true,
					maximumAge: 0,
					timeout: 5000,
				}
			);
		}

		return () => {
			if (watchIdRef.current !== null) {
				navigator.geolocation.clearWatch(watchIdRef.current);
			}
		};
	}, [onLocationUpdate]);

  return (
    <div style={{ padding: "1rem"}}>
      <h4 style={{ marginBottom: "0.5rem", color: "#333" }}>📍 您目前所在位置：</h4>
      <p style={{ fontSize: "16px", color: location.lat && location.lng ? "#007bff" : "#999" }}>
        {location.lat && location.lng
          ? `緯度：${location.lat.toFixed(6)}，經度：${location.lng.toFixed(6)}`
          : "尚未取得位置資訊"}
      </p>
    </div>
  );
  
};

export default LocationTracker;
