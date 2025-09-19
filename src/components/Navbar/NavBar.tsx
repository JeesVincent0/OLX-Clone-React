import { navBarStyles } from "./SubComponents/NavBar.styles";
import FirstSection from "./SubComponents/FirstSection";
import SecondSection from "./SubComponents/SecondSection";
import ThirdSection from "./SubComponents/ThirdSection";

const NavBar = () => {

    return (

        // main navbar container.
        <div className={navBarStyles.mainContainer}>

            {/* first section for olx icon and location search bar */}
            <FirstSection />

            {/* olx product search bar */}
            <SecondSection />

            {/* navbar other option like sell, favarite, language etc.. */}
            <ThirdSection />
            
        </div>
    )
}

export default NavBar