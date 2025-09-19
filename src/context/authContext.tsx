import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type Product } from "../hooks/useAuth";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";

import {
    where,
    setDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    startAfter,
    type DocumentData,
    type QueryDocumentSnapshot,
} from "firebase/firestore";
import { app } from "../firebase";

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [logInPopUp, setLogInPopUp] = useState(false);
    const [emailLogin, setEmailLogin] = useState(false);
    const [emailSignUp, setEmailSignUP] = useState(false);
    const [sellFormPopUp, setSellFormPopUp] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [favProducts, setFavProducts] = useState<Product[]>([]);
    const [myProducts, setMyProducts] = useState<Product[]>([]);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [editForm , setEditForm ] = useState(false);
    const [editItemId, setEditItemId] = useState("");

    const [increment, setIncrement] = useState(0);


    const fetchProductsByUser = async (userId: string): Promise<Product[]> => {
        if(!userId) return [];
        try {
            const q = query(
                collection(db, "products"),
                where("userId", "==", userId)
            );

            const querySnapshot = await getDocs(q);

            const products: Product[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Product, "id">),
            }));

            setMyProducts(products);
            return [];
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    };

    const fetchProducts = async () => {
        const q = query(
            collection(db, "products"),
            orderBy("createdAt", "desc"),
            limit(5)
        );

        const snapshot = await getDocs(q);
        const productList: Product[] = snapshot.docs.map((doc) => {
            const data = doc.data() as Omit<Product, "id">;
            return {
                id: doc.id,
                ...data,
            };
        });
        setProducts(productList);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
        setHasMore(snapshot.docs.length === 1);
    };

    const fetchMore = async () => {
        if (!lastDoc) return;

        const q = query(
            collection(db, "products"),
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            limit(5)
        );

        const snapshot = await getDocs(q);
        const productList: Product[] = snapshot.docs.map((doc) => {
            const data = doc.data() as Omit<Product, "id">;
            return {
                id: doc.id,
                ...data,
            };
        });

        setProducts((prev) => [...prev, ...productList]);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
        setHasMore(snapshot.docs.length === 5);
    };

    const db = getFirestore(app);

    // Add productId to favorites
    const addToFavorites = async (userId: string, productId: string) => {
        console.log(userId, productId, "This from add to favorite func")
        const userRef = doc(db, "products", productId);

        const result = await setDoc(
            userRef,
            { favorites: arrayUnion(userId) },
            { merge: true }   // ✅ creates doc if not exists
        );
        console.log("this is favorite ", result);
    };

    // Remove productId from favorites
    const removeFromFavorites = async (userId: string, productId: string) => {
        const userRef = doc(db, "products", productId);

        await updateDoc(userRef, {
            favorites: arrayRemove(userId),
        });
    };

    const fetchFavoriteProducts = async (userId: string): Promise<Product[]> => {
        if (!userId) return [];

        try {
            // Query only products where favorites array contains this userId
            const q = query(
                collection(db, "products"),
                where("favorites", "array-contains", userId)
            );

            const snapshot = await getDocs(q);

            const products: Product[] = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...(doc.data() as Omit<Product, "id">),
                };
            });

            setFavProducts(products);
            return [];
        } catch (error) {
            console.error("Error fetching favorite products:", error);
            return [];
        }
    };


    useEffect(() => {
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                setIsLoggedIn(true);
                setEmailLogin(false);
                setEditForm(false);
                setEmailSignUP(false);
                setLogInPopUp(false);
                setProducts([]);
                fetchProducts();
            } else {
                setProducts([]);
                fetchProducts();
                setIsLoggedIn(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                logInPopUp,
                setLogInPopUp,
                emailLogin,
                setEmailLogin,
                emailSignUp,
                setEmailSignUP,
                sellFormPopUp,
                setSellFormPopUp,
                user,
                products,
                setProducts,
                lastDoc,
                setLastDoc,
                hasMore,
                setHasMore,
                fetchMore,
                removeFromFavorites,
                addToFavorites,
                fetchFavoriteProducts,
                favProducts,
                setFavProducts,
                fetchProductsByUser,
                setMyProducts,
                myProducts,
                fetchProducts, 
                editForm , 
                setEditForm, 
                editItemId, 
                setEditItemId, increment, setIncrement
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
