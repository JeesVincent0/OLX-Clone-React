import { useState } from "react";
import { navBarStyles } from "./NavBar.styles"
import olx_icon from '../../../assets/icons/olx.jpeg';
import search_icon_black from '../../../assets/icons/search_icon_black.png';
import angle_icon from '../../../assets/icons/top-right_7356284.png';
import location_icon from '../../../assets/icons/location_icon.png';

const FirstSection = () => {

    const [location, setLocation] = useState("Inda");
    const [locationDropDown, setLocationDropDown] = useState(false);

    const sampleLocation = ['Kerala', 'Tamil Nadu', 'Karnataka', 'Punjab', 'Maharashtra'];

    // function for change location and location list drop down state, after location selection
    const changeLocation = (value: string): void => {
        setLocation(value);
        setLocationDropDown(!locationDropDown);
    }

    const changeDropDownState = () => { if (!locationDropDown) setLocationDropDown(true); };
    return (
        <div>
            <div className={navBarStyles.firstContainer}>

                {/* olx icon */}
                <img className={navBarStyles.icon} src={olx_icon} alt="olx" />

                {/* Location search bar */}
                <div className={navBarStyles.locationSearchContainer}>
                    <img className={navBarStyles.locationSearchIcon} src={search_icon_black} alt="" />
                    <input onClick={changeDropDownState} onChange={(e) => setLocation(e.target.value)} className={navBarStyles.locatoinSearchInput} type="text" value={location} />
                    <img onClick={() => setLocationDropDown(!locationDropDown)} className={`${locationDropDown ? `rotate-315` : `rotate-135`} transition-transform duration-300 mr-2 mb-2 cursor-pointer`} src={angle_icon} alt="" />
                </div>

                {/* Location drop down */}
                <div className={`${locationDropDown ? `` : `hidden`} h-80 w-[77%] top-[100%] mr-4 shadow-lg right-0 absolute bg-white`}>
                    <p className="text-gray-500 text-sm mb-5 ml-8 mt-4">POPULAR LOCATIONS</p>

                    {/* Location listing container */}
                    {sampleLocation.map((value: string) => (
                        <div onClick={() => changeLocation(value)} className={navBarStyles.locationNameContainer}><img className="w-6 h-6" src={location_icon} alt="" /><p className="ml-4">{value}</p></div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default FirstSection
