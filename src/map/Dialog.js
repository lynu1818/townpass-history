import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // 引入 React Bootstrap 組件
import "bootstrap/dist/css/bootstrap.min.css"; // 引入 Bootstrap 樣式

const DialogComponent = () => {
	return (
		<Container
			fluid
			className="h-screen d-flex justify-content-center align-items-center"
		>
			<Row className="w-auto">
				<Col xs={2} className="d-flex align-items-center">
					{/* 左側的圓形頭像 */}
					<img
						className="rounded-circle"
						src="https://via.placeholder.com/100"
						alt="avatar"
						style={{ width: "64px", height: "64px" }} // 控制頭像大小
					/>
				</Col>
				<Col xs={10}>
					{/* 右側的對話框內容 */}
					<div className="rounded-lg">
						<p className="text-dark bg-light p-3 rounded">
							This is a sample dialog message! You can add any
							content here.
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default DialogComponent;
