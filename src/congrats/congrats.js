import React, { useEffect, useState } from "react";
import "./badge.css"; // Assuming you have the same CSS in badge.css
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import database from "../services/firebaseConfig";
import { ref, set, getDatabase, update } from "firebase/database";
import firebase from "firebase/compat/app";
import { spots } from "../map/Spot";
import background from './badge.jpg'
import { Box } from "@mui/material";

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
    const [visible, setVis] = useState(true);
    const { libraryId } = useParams();
    const navigate = useNavigate();
    checkLoc(parseInt(libraryId));
    const src = spots[libraryId].badgeSrc;
    console.log("image:", src);
    const handleClick = () => {
    };
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVis(false);
                navigate(`/story/${libraryId}`);
            }, 5500);
        }
    }, [visible]);
    return (
        <div className="congrats_body">
            {/* <div className="notification">恭喜你獲得一個徽章</div> */}
            <div className="letter-image">
                <div className="animated-mail">
                    <div className="back-fold"></div>
                    {/* <div
                        className="badge"
                        style={{
                            backgroundImage: `url(${background})`, // Use src to set background image
                            // backgroundImage: "url(./badge.jpg)", // Use src to set background image
                            backgroundSize: "cover", // Make sure the image covers the entire div
                            backgroundPosition: "center", // Center the image
                            backgroundRepeat: "no-repeat", // Prevent image from repeating
                        }}
                    ></div> */}

                    <Box className='letter' component='img' src={src} />
                    <div className="top-fold"></div>
                    <div className="body"></div>
                    <div className="left-fold"></div>
                </div>
                <div className="shadow"></div>
            </div>
            {/* <Button onClick={handleClick}>確認</Button> */}
        </div>
    );
};

export default Congrats;