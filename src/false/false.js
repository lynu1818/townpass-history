// Notification.jsx
import React, { useState, useEffect } from 'react';
import './false.css'; // Import your CSS
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const Notification = () => {
	const [visible, setVisible] = useState(true);
	const [animate, setAnimate] = useState(false);
	const { libraryId } = useParams();
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/story/${libraryId}`);
	}

	useEffect(() => {
		if (visible) {
			setAnimate(true);
			const timer = setTimeout(() => {
				setAnimate(false);
				setVisible(false);
			}, 1500);
			return () => clearTimeout(timer); // Cleanup timer
		}
	}, [visible]);

	return (
		<>
			<div className="my-10">
				{visible && (
					<div className="notification" id="notification">
						<p >答錯了！</p>
						<img
							src="../img/false.png"
							alt="Wrong Answer"
							id="falseImage"
							className={animate ? 'animate' : ''}
						/>
					</div>
				)}
			</div>
			<Button onClick={handleClick}>
				確認
			</Button>
		</>
	);
};

export default Notification;
