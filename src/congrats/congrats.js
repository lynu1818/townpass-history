import React from "react";
import "./badge.css"; // Assuming you have the same CSS in badge.css
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import database from "../services/firebaseConfig";
import { ref, set, getDatabase, update } from "firebase/database";
import firebase from "firebase/compat/app";

const checkLoc = async (libraryId) => {
	try {
		const db = getDatabase();
		const checkRef = ref(db, `location/`);
		const updates = {};
		updates[`${libraryId}`] = true;
		await update(checkRef, updates);
	} catch (error) {
		console.log("error check location", error);
		throw error;
	}
};

const Congrats = () => {
	const { libraryId } = useParams();
	const navigate = useNavigate();
	checkLoc(parseInt(libraryId));
	const handleClick = () => {
		navigate(`/story/${libraryId}`);
	};
	return (
		<div className="congrats_body">
			<div className="notification">恭喜你獲得一個徽章</div>
			<div className="letter-image">
				<div className="animated-mail">
					<div className="back-fold"></div>
					<div className="letter">
						<div className="letter-border"></div>
						<div className="letter-title"></div>
						<div className="letter-context"></div>
						<div className="letter-stamp">
							<div className="letter-stamp-inner"></div>
						</div>
					</div>
					<div className="top-fold"></div>
					<div className="body"></div>
					<div className="left-fold"></div>
				</div>
				<div className="shadow"></div>
			</div>
			<Button onClick={handleClick}>確認</Button>
		</div>
	);
};

export default Congrats;
