import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDInhSPyaYoBKeUjuI8RDPO1vPnuAsKroI",
	authDomain: "netflix-bb0a7.firebaseapp.com",
	projectId: "netflix-bb0a7",
	storageBucket: "netflix-bb0a7.appspot.com",
	messagingSenderId: "9857971976",
	appId: "1:9857971976:web:cf4f73d06d11f29c18debd",
	measurementId: "G-WFF2GDDZ9R",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
