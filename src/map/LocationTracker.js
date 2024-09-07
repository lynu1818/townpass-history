import React, { useState, useEffect } from "react";

const LocationTracker = ({ onLocationUpdate }) => {
	// const [status, setStatus] = useState("Initializing...");
	const [location, setLocation] = useState({ lat: null, lng: null });
	let watchId = null;

	useEffect(() => {
		const startTracking = () => {
			if (navigator.geolocation) {
				// setStatus("Tracking location...");

				// 使用 watchPosition 監聽位置變化
				watchId = navigator.geolocation.watchPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						setLocation({ lat: latitude, lng: longitude });
						// setStatus("Location is being tracked.");

						// 將位置更新傳遞給父組件
						onLocationUpdate({ lat: latitude, lng: longitude });
					},
					(error) => {
						switch (error.code) {
							case error.PERMISSION_DENIED:
								// setStatus(
								// 	"User denied the request for Geolocation."
								// );
								break;
							case error.POSITION_UNAVAILABLE:
								// setStatus(
								// 	"Location information is unavailable."
								// );
								break;
							case error.TIMEOUT:
								// setStatus(
								// 	"The request to get user location timed out."
								// );
								break;
							case error.UNKNOWN_ERROR:
								// setStatus("An unknown error occurred.");
								break;
						}
					},
					{
						enableHighAccuracy: true, // 提高精度
						maximumAge: 0, // 不使用緩存的位置信息
						timeout: 5000, // 超時時間
					}
				);
			} else {
				// setStatus("Geolocation is not supported by this browser.");
			}
		};

		startTracking();

		return () => {
			if (watchId) {
				navigator.geolocation.clearWatch(watchId);
			}
		};
	}, [onLocationUpdate]);

	return (
		<div>
			{/* <p id="status">{status}</p> */}
			{/* <p id="location">
				{location.lat && location.lng
					? `Latitude: ${location.lat}, Longitude: ${location.lng}`
					: "Location not available"}
			</p> */}
		</div>
	);
};

export default LocationTracker;
