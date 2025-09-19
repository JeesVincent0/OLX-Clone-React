import MyAdsCards from "./SubComponents/MyAdsCards";
import { useAuth } from "../../hooks/useAuth";

const MyAdsList = () => {
    const { isLoggedIn, setLogInPopUp } = useAuth();

    if (isLoggedIn) {
        return (
            <div>
                <div className="relative px-40 pt-6">
                    <div className=" h-10 mb-4">
                        <p className="font-medium text-3xl">My Ads</p>
                    </div>
                    <MyAdsCards />
                </div>
            </div>
        )
    } else {
        setLogInPopUp(true);
    }

}

export default MyAdsList