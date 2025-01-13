// Your web app's Firebase configuration

// Firebase configuration and initialization
const { initializeApp, getFirestore, getAnalytics, firestoreAPI } = window.initFirebase();

const firebaseConfig = {
    apiKey: "AIzaSyAmDOGEGFyuooBzmcEDhaPH4M3Ymm33hJU",
    authDomain: "journet-fc89e.firebaseapp.com",
    databaseURL: "https://journet-fc89e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "journet-fc89e",
    storageBucket: "journet-fc89e.firebasestorage.app",
    messagingSenderId: "368845266937",
    appId: "1:368845266937:web:14b1f0bef94272e68a2728",
    measurementId: "G-2TYRGT1JGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export for use in other files
window.db = {
    collection: (collectionName) => {
        return {
            add: async (data) => {
                const collectionRef = firestoreAPI.collection(db, collectionName);
                try {
                    const docRef = await firestoreAPI.addDoc(collectionRef, data);
                    console.log("Document written with ID: ", docRef.id);
                    return docRef;
                } catch (e) {
                    console.error("Error adding document: ", e);
                    throw e;
                }
            }
        };
    }
};
