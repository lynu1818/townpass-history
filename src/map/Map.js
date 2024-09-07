import React, { useState, useRef, useEffect } from "react";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import LocationTracker from "./LocationTracker";
import haversine from "haversine-distance"; // 用來計算經緯度之間的距離
import { useNavigate } from "react-router-dom"; // 引入 useNavigate
import { ref, get, getDatabase } from "firebase/database";

const locations = [
	{
		id: "0",
		name: "二二八和平公園",
		address: "台北市中正區凱達格蘭大道3號",
		city: "中正區",
		latitude: "25.040502406798485",
		longitude: "121.51554449614804",
		category: "library",
	},
	{
		id: "1",
		name: "大稻埕",
		address: "台北市大同區迪化街一段44號",
		city: "大同區",
		latitude: "25.055186397987633",
		longitude: "121.5100021826548",
		category: "library",
	},
	{
		id: "2",
		name: "故宮博物院",
		address: "台北市士林區至善路二段221號",
		city: "士林區",
		latitude: "25.103288085585152",
		longitude: "121.54855687301571",
		category: "library",
	},
	{
		id: "3",
		name: "北投溫泉博物館",
		address: "台北市北投區中山路2號",
		city: "北投區",
		latitude: "25.136697544499594",
		longitude: "121.50712146345845",
		category: "library",
	},
];

// 自定義地圖樣式，用於隱藏 POI 和路標等多餘的地圖元素
const mapStyle = [
	{
		elementType: "geometry",
		stylers: [
			{
				color: "#ebe3cd",
			},
		],
	},
	{
		elementType: "labels",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#523735",
			},
		],
	},
	{
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#f5f1e6",
			},
		],
	},
	{
		featureType: "administrative",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#c9b2a6",
			},
		],
	},
	{
		featureType: "administrative.land_parcel",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "administrative.land_parcel",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#dcd2be",
			},
		],
	},
	{
		featureType: "administrative.land_parcel",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#ae9e90",
			},
		],
	},
	{
		featureType: "administrative.neighborhood",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "landscape.natural",
		elementType: "geometry",
		stylers: [
			{
				color: "#dfd2ae",
			},
		],
	},
	{
		featureType: "poi",
		elementType: "geometry",
		stylers: [
			{
				color: "#dfd2ae",
			},
		],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#93817c",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#a5b076",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#447530",
			},
		],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [
			{
				color: "#f5f1e6",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
			{
				color: "#fdfcf8",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
			{
				color: "#f8c967",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#e9bc62",
			},
		],
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "geometry",
		stylers: [
			{
				color: "#e98d58",
			},
		],
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#db8555",
			},
		],
	},
	{
		featureType: "road.local",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#806b63",
			},
		],
	},
	{
		featureType: "transit.line",
		elementType: "geometry",
		stylers: [
			{
				color: "#dfd2ae",
			},
		],
	},
	{
		featureType: "transit.line",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#8f7d77",
			},
		],
	},
	{
		featureType: "transit.line",
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#ebe3cd",
			},
		],
	},
	{
		featureType: "transit.station",
		elementType: "geometry",
		stylers: [
			{
				color: "#dfd2ae",
			},
		],
	},
	{
		featureType: "water",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#b9d3c2",
			},
		],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#92998d",
			},
		],
	},
];

const Map = () => {
	const [userLocation, setUserLocation] = useState(null); // 儲存使用者位置
	const mapRef = useRef(null);
	const [map, setMap] = useState(null); // 儲存地圖實例
	const [userMarker, setUserMarker] = useState(null); // 使用者位置標記
	const [distance, setDistance] = useState(null);
	const [selectedLibrary, setSelectedLibrary] = useState(null);
	const [openedInfoWindow, setOpenedInfoWindow] = useState(null);
	const [locationsVisited, setLocationsVisited] = useState([]);
	const navigate = useNavigate(); // 初始化導航

	// 根據類別和是否已經去過來返回不同的圖標
	const getMarkerIcon = (category, visited) => {
		let iconUrl;
		if (visited) {
			switch (category) {
				case "library":
					iconUrl =
						"https://firebasestorage.googleapis.com/v0/b/townpass-history.appspot.com/o/visited.png?alt=media&token=449b6b78-da57-4d3e-80e9-9cd418fb5363";
					break;
				default:
					iconUrl =
						"http://maps.google.com/mapfiles/ms/icons/grey-dot.png";
			}
		} else {
			switch (category) {
				case "library":
					iconUrl =
						"https://firebasestorage.googleapis.com/v0/b/townpass-history.appspot.com/o/library.png?alt=media&token=fb868272-411d-4dbe-a964-ba40e279e5c2";
					break;
				default:
					iconUrl =
						"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
			}
		}
		return iconUrl;
	};

	// 從資料庫中獲取地點數據
	const fetchLocations = async () => {
		const db = getDatabase();
		const locRef = ref(db, "location"); // 假設位置資料儲存在 'location'
		const snapshot = await get(locRef);
		if (snapshot.exists()) {
			console.log("Fetched locations: ", snapshot.val());
			const data = snapshot.val();
			return data;
		} else {
			console.log("No data available");
			return [];
		}
	};

	useEffect(() => {
		// 使用異步函數來獲取數據
		const loadLocations = async () => {
			try {
				const locationVisitedData = await fetchLocations(); // 從資料庫中獲取數據
				setLocationsVisited(locationVisitedData); // 儲存數據到狀態
			} catch (error) {
				console.error("Error fetching location data:", error);
			}
		};

		loadLocations(); // 調用加載地點的函數

		console.log("Current locations visited: ", locationsVisited);
	}, []); // [] 確保只在組件掛載時執行一次

	// 計算距離
	const calculateDistance = (userLocation, libraryLocation) => {
		if (userLocation && libraryLocation) {
			const userCoords = { lat: userLocation.lat, lon: userLocation.lng };
			const libraryCoords = {
				lat: libraryLocation.lat,
				lon: libraryLocation.lng,
			};
			const distance = haversine(userCoords, libraryCoords);
			return (distance / 1000).toFixed(2); // 公里單位
		}
		return null;
	};

	useEffect(() => {
		const loadGoogleMapsScript = () => {
			// 檢查是否已經加載 Google Maps API
			if (!window.google || !window.google.maps) {
				const script = document.createElement("script");
				script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD1XyYj-GY46x5eJRURb3jyDOG27Pqx73g&libraries=marker`;
				script.async = true;
				document.head.appendChild(script);

				script.onload = () => {
					initMap(); // 當 Google Maps API 加載完成後初始化地圖
				};
			} else {
				// 如果 API 已加載，直接初始化地圖
				initMap();
			}
		};

		const initMap = async () => {
			if (!window.google) return;

			const { Map, InfoWindow } = await window.google.maps.importLibrary(
				"maps"
			);
			const { AdvancedMarkerElement, PinElement } =
				await window.google.maps.importLibrary("marker");

			// 使用使用者位置作為地圖中心，如果不存在則使用預設位置
			const center = userLocation || { lat: 25.030152, lng: 121.538459 };

			const map = new window.google.maps.Map(mapRef.current, {
				zoom: 12,
				center: center,
				// mapId: "DEMO_MAP_ID",
				disableDefaultUI: true,
				mapTypeControl: false,
				// styles: mapStyle,
			});

			map.setOptions({ styles: mapStyle });

			setMap(map); // 儲存地圖實例

			const infoWindow = new window.google.maps.InfoWindow({
				content: "",
				disableAutoPan: true,
			});

			// 創建遮罩多邊形

			// 添加地點標記
			const markers = locations.map((location) => {
				console.log(location);
				const marker = new window.google.maps.Marker({
					position: {
						lat: parseFloat(location.latitude),
						lng: parseFloat(location.longitude),
					},
					map: map,
					title: location.name,
					icon: getMarkerIcon(
						location.category,
						locationsVisited[location.id]
					), // 根據 visited 狀態顯示不同圖標
				});

				marker.addListener("click", () => {
					infoWindow.setContent(
						`<div class="text-sm">
							<h3>${location.name}</h3>
							<p>${location.address}</p>
                            ${
								!locationsVisited[location.id]
									? `<button class="btn btn-primary mt-2" id="applyBtn">Go！</button>`
									: ""
							}
						</div>`
					);
					infoWindow.open(map, marker);

					if (!locationsVisited[location.id]) {
						// 設置按鈕的行為
						setTimeout(() => {
							document.getElementById("applyBtn").onclick =
								() => {
									navigate(`/question/${location.id}`);
								};
						}, 100); // 避免 InfoWindow 還未渲染完成
					}
				});

				return marker;
			});

			// 使用 MarkerClusterer 來管理標記
			// new MarkerClusterer({
			// 	markers,
			// 	map,
			// 	renderer,
			// });
		};

		loadGoogleMapsScript();
	}, [locationsVisited]);

	useEffect(() => {
		if (map && userLocation) {
			// 如果沒有使用者標記，則創建一個新的標記
			if (!userMarker) {
				const newMarker = new window.google.maps.Marker({
					position: userLocation,
					map: map,
					title: "Your Location",
					icon: {
						url: "https://firebasestorage.googleapis.com/v0/b/townpass-history.appspot.com/o/me.png?alt=media&token=cc20ea2d-5fce-469d-9b54-4f1bd43771e5", // 使用藍色標記
					},
				});
				setUserMarker(newMarker); // 儲存使用者標記
			} else {
				// 更新現有標記的位置
				userMarker.setPosition(userLocation);
			}

			// 更新地圖中心到使用者當前位置
			map.setCenter(userLocation);
		}
	}, [map, userLocation, userMarker]); // 只在 userLocation 或 map 改變時更新

	// 當 distance 狀態改變時，更新 InfoWindow
	useEffect(() => {
		if (selectedLibrary && map && openedInfoWindow && distance !== null) {
			openedInfoWindow.setContent(
				`
					<div class="text-sm">
						<h3>${selectedLibrary.name}</h3>
						<p>${selectedLibrary.address}</p>
						<p>距離：${distance} 公里</p>
                        ${
							!locationsVisited[selectedLibrary.id]
								? `<button class="btn btn-primary mt-2" id="applyBtn">Go！</button>`
								: ""
						}
					</div>
				`
			);
		}
	}, [distance, selectedLibrary, map, openedInfoWindow, locationsVisited]);

	return (
		<div>
			<LocationTracker onLocationUpdate={setUserLocation} />
			<div ref={mapRef} style={{ width: "100%", height: "700px" }}></div>
		</div>
	);
};

export default Map;
