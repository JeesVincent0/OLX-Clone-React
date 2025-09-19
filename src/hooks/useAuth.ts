import { useContext, createContext } from "react";
import { type User } from "firebase/auth";
import { type DocumentData, type Timestamp, QueryDocumentSnapshot } from "firebase/firestore";

export interface Product {
    id: string;
    title: string;
    price: number;
    createdAt: Timestamp;
    images: string[];
    description: string;
    userId: string;
    condition: string;
    favorites: string[];
}

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;

    logInPopUp: boolean;
    setLogInPopUp: (value: boolean) => void;

    emailLogin: boolean;
    setEmailLogin: (value: boolean) => void;

    emailSignUp: boolean;
    setEmailSignUP: (value: boolean) => void;

    sellFormPopUp: boolean;
    setSellFormPopUp: (value: boolean) => void;

    user: User | null;

    products: Product[];
    setProducts: (value: Product[]) => void;

    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
    setLastDoc: (value: QueryDocumentSnapshot<DocumentData> | null) => void;

    hasMore: boolean;
    setHasMore: (value: boolean) => void;

    fetchMore: () => Promise<void>;

    removeFromFavorites: (userId: string, productId: string) => Promise<void>;

    addToFavorites: (userId: string, productId: string) => Promise<void>;

    fetchFavoriteProducts: (userId: string) => Promise<Product[]>;

    favProducts: Product[];

    setFavProducts: React.Dispatch<React.SetStateAction<Product[]>>;

    fetchProductsByUser: (userId: string) => Promise<Product[]>;

    setMyProducts: React.Dispatch<React.SetStateAction<Product[]>>;

    myProducts: Product[];

    fetchProducts: () => Promise<void>;

    editForm: boolean;

    setEditForm: React.Dispatch<React.SetStateAction<boolean>>;

    editItemId: string;

    setEditItemId: React.Dispatch<React.SetStateAction<string>>;

    increment: number;

    setIncrement: React.Dispatch<React.SetStateAction<number>>;

}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth Error");
    return context;
};
