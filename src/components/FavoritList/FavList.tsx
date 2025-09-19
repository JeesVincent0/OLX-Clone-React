import { useAuth } from "../../hooks/useAuth"
import FavCards from "./SubComponents/FavCards"

const FavList = () => {
    const { isLoggedIn, setLogInPopUp } = useAuth();

    if (isLoggedIn) {
        return (
            <div>
                <div className="relative px-40 pt-6">
                    <div className=" h-10 mb-4">
                        <p className="font-medium text-3xl">Favorite Items</p>
                    </div>
                    <FavCards />
                </div>
            </div>
        )
    } else {
        setLogInPopUp(true);
    }
}

export default FavList
