import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // App 樣式
import "./index.css"; // TailwindCSS 樣式
import BadgePage from "./badge/BadgePage";
import MapPage from "./map/MapPage";
import { Question } from "./battle/question";

// Tabs 組件，設置為頂部固定，置中並填滿
const TopTabs = () => {
	const location = useLocation(); // 用來獲取當前路徑
	const navigate = useNavigate(); // 用來進行頁面跳轉
	const activeKey = location.pathname === "/badge" ? "badge" : "map"; // 根據路徑來設置當前激活的 Tab

	return (
		<Tabs
			activeKey={activeKey} // 根據路徑動態設置 activeKey
			className="mb-3 fixed-top bg-white w-100 d-flex justify-content-center" // 使用 Bootstrap 和 TailwindCSS 設置寬度為 100% 並置中
			onSelect={(k) => navigate(`/${k}`)} // 根據選中的 Tab 進行頁面跳轉
			fill // 讓 Tabs 填滿
		>
			<Tab
				eventKey="map"
				title="Map"
				className="flex-grow-1 text-center"
			/>
			<Tab
				eventKey="badge"
				title="Badge"
				className="flex-grow-1 text-center"
			/>
		</Tabs>
	);
};

function App() {
	const location = useLocation();
	const showTabs = location.pathname === "/map" || location.pathname === "/badge";
	return (
		<div className="App">
			{/* 固定的 Tabs */}
			{showTabs && <TopTabs />}

			{/* 頁面內容 */}
			<div style={{ paddingTop: "80px" }}>
				{/* 給內容添加上邊距，防止被 Tabs 遮擋 */}
				<Routes>
					<Route path="/map" element={<MapPage />} />
					<Route path="/badge" element={<BadgePage />} />
					<Route path="/" element={<MapPage />} />{" "}
					<Route
						path="/question/:libraryId"
						element={<Question />}
					/>{" "}
					{/* 默認跳轉到 MapPage */}
				</Routes>
			</div>
		</div>
	);
}

function MainApp() {
	return (
		<Router>
			<App />
		</Router>
	);
}

export default MainApp;