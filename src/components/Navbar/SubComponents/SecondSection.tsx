import { navBarStyles } from "./NavBar.styles";
import search_icon_white from '../../../assets/icons/search_icon_white.png';
import { useAuth } from "../../../hooks/useAuth";


const SecondSection = () => {

    const { isLoggedIn } = useAuth();

    return (
        <div className={!isLoggedIn ? navBarStyles.secontContainerLoggedIn : navBarStyles.secontContainer}>

            {/* Input field for product search */}
            <input className={!isLoggedIn ? navBarStyles.mainSearchInputLogged : navBarStyles.mainSearchInput} type="text" placeholder="Search" />

            {/* Product search bat button */}
            <div className={navBarStyles.searchButton}>
                <img className={navBarStyles.searchIcon} src={search_icon_white} alt="" />
            </div>
            
        </div>
    )
}

export default SecondSection