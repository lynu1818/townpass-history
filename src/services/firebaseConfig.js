// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDhr0HHEmW8ADMpSUGlOfjSIfSV_5awen4",
	authDomain: "townpass-history.firebaseapp.com",
	databaseURL: "https://townpass-history-default-rtdb.firebaseio.com",
	projectId: "townpass-history",
	storageBucket: "townpass-history.appspot.com",
	messagingSenderId: "563698809399",
	appId: "1:563698809399:web:ceded70e0fe8a156325db2",
	measurementId: "G-G2LLB36GQC",
};

const app = initializeApp(firebaseConfig);

// Initialize other Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app); // This is what you'll use for the 'get' method
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export default app;
export { analytics, auth, database, storage, provider };
