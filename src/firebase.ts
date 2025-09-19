import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKE,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SEDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASEUREMENT_ID
};


export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore(app);

const signUp = async (name: string, email: string, password: string): Promise<void> => {
    try {
        console.log("This suth is triggered successfully")
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })

    } catch (error) {
        console.log(error);
        
    }
}

const signIn = async (email: string, password: string): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        
    }
}

const logOut = async () => {
    try {
        signOut(auth);
    } catch (error) {
        console.log(error);
    }
}

export { auth, db, signIn, signUp, logOut, storage };