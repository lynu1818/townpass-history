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
import Question from "./battle/question";
import Congrats from "./congrats/congrats";
import Notification from "./false/false";
import Story from "./battle/story";

export const TopTabs = () => {
	const location = useLocation(); // 用來獲取當前路徑
	const navigate = useNavigate(); // 用來進行頁面跳轉
	const activeKey = location.pathname === "/badge" ? "badge" : "map"; // 根據路徑來設置當前激活的 Tab

	return (
		<Tabs
			activeKey={activeKey} // 根據路徑動態設置 activeKey
			className="mb-3 fixed-top w-100 d-flex justify-content-center custom-tabs" // 使用 Bootstrap 設置寬度為 100% 並置中
			onSelect={(k) => navigate(`/${k}`)} // 根據選中的 Tab 進行頁面跳轉
			fill // 讓 Tabs 填滿
		>
			<Tab
				eventKey="map"
				title="地圖"
				className="flex-grow-1 text-center"
				style={{ color: "#5AB4C5 !important" }}
			/>
			<Tab
				eventKey="badge"
				title="徽章"
				className="flex-grow-1 text-center"
				style={{ color: "#5AB4C5 !important" }}
			/>
		</Tabs>
	);
};
function App() {
	const location = useLocation();
	const showTabs =
		location.pathname === "/map" ||
		location.pathname === "/badge" ||
		location.pathname === "/";
	return (
		<div className="App">
			{/* 固定的 Tabs */}
			{showTabs && <TopTabs />}

			{/* 頁面內容 */}
			<div style={{ paddingTop: showTabs ? "80px" : "0px" }}>
				{/* 給內容添加上邊距，防止被 Tabs 遮擋 */}
				<Routes>
					<Route path="/map" element={<MapPage />} />
					<Route path="/badge" element={<BadgePage />} />
					<Route path="/" element={<MapPage />} />
					<Route path="/question/:libraryId" element={<Question />} />
					<Route path="/congrats/:libraryId" element={<Congrats />} />
					<Route
						path="/false/:libraryId"
						element={<Notification />}
					/>
					<Route path="/story/:libraryId" element={<Story />} />
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
