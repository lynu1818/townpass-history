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
	{
		id: "4",
		name: "西門紅樓",
		address: "台北市萬華區成都路10號",
		city: "萬華區",
		latitude: "25.042218026130556",
		longitude: "121.50682164907415",
		detail: "西門紅樓建於1908年，由日本建築師近藤十郎設計，是台灣第一座由官方興建的公營市場，也是目前全台保存最完整的三級古蹟建築。西門紅樓由兩大結構組成：八角樓和十字樓。八角樓的「八卦造型」象徵八方雲集，是主要入口，而十字樓的「十字架造型」則構成建築主體。再加上兩旁的南北廣場，整個建築群被統稱為「西門紅樓」。西門紅樓的功能和角色在歷史的變遷中多次轉換，先後作為市場、書場、電影院、劇場使用。自2007年起，臺北市政府文化局將其交由台北市文化基金會營運管理，目標是通過文創平台的推廣，振興西門町街區。經過十多年的經營，西門紅樓已逐漸成為臺北市乃至台灣的指標性文創及藝文據點。",
		question: "請問西門紅樓沒有被做為什麼場所？",
		option1: "校園",
		option2: "電影院",
		option3: "市場",
		option4: "劇場",
		src: "../img/ximen.jpg",
	},
	{
		id: "5",
		name: "中正紀念堂",
		address: "台北市中正區中山南路21號",
		city: "中正區",
		latitude: "25.03571585776773",
		longitude: "121.52015637791013",
		detail: "中正紀念堂由著名建築師楊卓成設計，他同時也是圓山大飯店的設計者。紀念堂原址是台北市區內最大的軍區——陸軍總部。建築採用藍白兩色，呼應國旗的主要顏色，頂部的天穹裝飾則是象徵「青天白日」的12道光芒。隨著台灣民主化進程的推進，紀念堂前的廣場已成為各類民主運動的重要集會地點。中正紀念堂的建築以其70米高的白牆藍瓦在紀念公園的中央矗立，不論從哪個角度看，都顯得格外雄偉壯觀。對於來台灣的國外遊客來說，中正紀念堂是必訪之地。紀念堂內設有展覽空間，陳列與展示了有關歷史的重要文物，並設有紀念品販售區供遊客購買紀念品。",
		question: "請問中正紀念堂的原址為何？",
		option1: "陸軍總部",
		option2: "海軍總部",
		option3: "空軍總部",
		option4: "國防部",
		src: "../img/memorial_hall.jpg",
	},
	{
		id: "6",
		name: "剝皮寮歷史街區",
		address: "台北市萬華區康定路173巷",
		city: "萬華區",
		latitude: "25.0370324140505",
		longitude: "121.50220235092581",
		detail: "在台北市萬華區的老街巷弄中，有一處保留著百餘年前清代街道風貌的歷史街區——剝皮寮。這條街道以其典雅的紅磚牆、拱形騎樓和雕花窗櫺而聞名，散發出一種古樸而純粹的美感。剝皮寮歷史街區位於龍山寺附近，座落在康定路、廣州街和昆明街的交匯處。這裡保留了完整的清代街巷形制和傳統店屋建築，見證了艋舺市街的繁榮發展，擁有獨特的歷史文化意義和建築特色。近年來，剝皮寮街區不僅成為電影文化與活動推廣的熱點，也擴展成為一個藝文展演和文化體驗的多元平台。透過串聯在地特色和創造故事性的互動體驗，剝皮寮被賦予了更多的文化意涵和回憶，使這個歷史空間更加充滿生命力。",
		question: "請問剝皮寮歷史街區位於哪一個區？",
		option1: "萬華區",
		option2: "中正區",
		option3: "大同區",
		option4: "士林區",
		src: "../img/old_street.jpg",
	},
	{
		id: "7",
		name: "龍山寺",
		address: "台北市萬華區廣州街211號",
		city: "萬華區",
		latitude: "25.03728706572752",
		longitude: "121.49991333146068",
		detail: "艋舺龍山寺歷史悠久，建築風格獨特，是台灣的重要文化地標之一。該寺最初建築規模宏偉、雕塑精緻，歷經多次重修，包括嘉慶二十年的地震、同治六年的暴風雨，以及民國八年的白蟻侵蝕。在第二次世界大戰期間，寺廟因空襲受損，但觀世音菩薩聖像奇蹟般完好無損，這一神蹟成為當地居民的精神支柱。龍山寺的建築採用中國古典三進四合院式宮殿風格，包含前殿、正殿、後殿及左右護龍。其建築細節，如全台僅見的銅鑄蟠龍柱、無釘無鐵的螺旋藻井及色彩豔麗的剪黏和交趾陶裝飾，體現了台灣寺廟建築藝術之精華。民國74年，龍山寺被列為國家二級古蹟，與國立故宮博物院、中正紀念堂並列為國際觀光客的三大名勝之一。該寺還在板橋文化路設立文化廣場大樓，舉辦各種弘揚佛法和社會教育的活動。龍山寺每年定期舉辦節慶祭典及民俗活動，如花燈展、浴佛節和盂蘭盆勝會，讓民眾感受台灣傳統文化的魅力。",
		question: "請問龍山寺為國家幾級的古蹟？",
		option1: "二級",
		option2: "一級",
		option3: "三級",
		option4: "它不是古蹟",
		src: "../img/temple.jpg",
	},
	{
		id: "8",
		name: "二二八和平公園",
		address: "台北市中正區凱達格蘭大道3號",
		city: "中正區",
		latitude: "25.040502406798485",
		longitude: "121.51554449614804",
		joke: "板南線的龍山寺站到江子翠站這一段距離，是台北捷運兩站間最長的站距，總共約3.1公里，行車時間大概要3分鐘。",
	},
	{
		id: "9",
		name: "國立臺灣博物館",
		address: "台北市中正區襄陽路2號",
		city: "中正區",
		latitude: "25.04302046331827",
		longitude: "121.51515138343392",
		joke: "如果想進入捷運站借廁所，可以跟站務人員要一張臨時車票，這張免費車票限時15分鐘、僅限出入同站，出站再繳回即可。",
	},
	{
		id: "10",
		name: "國史館",
		address: "臺北市中正區長沙街一段2號",
		city: "中正區",
		latitude: "25.040285691268984",
		longitude: "121.510811996925",
		joke: "台北101能夠承受每小時60米的強風，相當於17級颱風的風力。",
	},
	{
		id: "11",
		name: "臺北市立天文科學教育館",
		address: "臺北市士林區基河路363號",
		city: "士林區",
		latitude: "25.0960420462878",
		longitude: "121.51839548343514",
		joke: "台北捷運上禁止飲食，除了保持車廂整潔外，也是為了避免食物殘渣吸引小動物破壞、干擾捷運上的設備。",
	},
	{
		id: "12",
		name: "臺北市立動物園",
		address: "台北市文山區新光路二段30號",
		city: "文山區",
		latitude: "24.998689829269946",
		longitude: "121.58095349241418",
		joke: "台北的公車如果前面有顏色字，代表會到那個顏色的捷運站。",
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
			iconUrl =
				"https://firebasestorage.googleapis.com/v0/b/townpass-history.appspot.com/o/visited.png?alt=media&token=449b6b78-da57-4d3e-80e9-9cd418fb5363";
		} else {
			iconUrl =
				"https://firebasestorage.googleapis.com/v0/b/townpass-history.appspot.com/o/library.png?alt=media&token=fb868272-411d-4dbe-a964-ba40e279e5c2";
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
			// 確保經緯度是數字
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
								!locationsVisited[location.id] &&
								location.id < 8
									? `<button class="btn btn-primary mt-2" id="applyBtn">Go！</button>`
									: ""
							}
                            ${
								location.id > 7
									? `<p>${locations[location.id].joke}</p>`
									: ""
							}
						</div>`
					);
					infoWindow.open(map, marker);
					setOpenedInfoWindow(infoWindow);
					setSelectedLibrary(location);

					if (location.id < 8 && !locationsVisited[location.id]) {
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

			// 使用 MarkerClusterer 來管理標記
			// new MarkerClusterer({
			// 	markers,
			// 	map,
			// 	renderer,
			// });
		};

		loadGoogleMapsScript();
	}, [locationsVisited, userLocation, userMarker, navigate]);

	useEffect(() => {
		if (map && userLocation) {
			// 確保 selectedLibrary 存在且其經緯度已被正確設置為數字
			if (
				selectedLibrary &&
				selectedLibrary.latitude &&
				selectedLibrary.longitude
			) {
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
				// map.setCenter(userLocation);

				// 檢查 selectedLibrary 是否存在經緯度並轉換為數字
				const libraryLocation = {
					lat: parseFloat(selectedLibrary.latitude),
					lng: parseFloat(selectedLibrary.longitude),
				};
				map.setCenter(libraryLocation);

				// 計算距離
				setDistance(calculateDistance(userLocation, libraryLocation));
			}
		}
	}, [map, userLocation, userMarker, openedInfoWindow, selectedLibrary]); // 只在 userLocation 或 map 改變時更新

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
							!locationsVisited[selectedLibrary.id] &&
							selectedLibrary.id < 8
								? `<button class="btn btn-primary mt-2" id="applyBtn">Go！</button>`
								: ""
						}
                        ${
							selectedLibrary.id > 7
								? `<p>${locations[selectedLibrary.id].joke}</p>`
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
