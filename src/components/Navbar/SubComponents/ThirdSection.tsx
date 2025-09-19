//import hooks
import { useAuth } from '../../../hooks/useAuth';
import { navBarStyles } from './NavBar.styles';
import { useState } from 'react';
import { logOut } from '../../../firebase';

// import icons
import angle_icon from '../../../assets/icons/angle_icon.png';
import bell_icon from '../../../assets/icons/notification_icon.png';
import chat_icon from '../../../assets/icons/chat_icon.png';
import favorite_icon from '../../../assets/icons/favorite_icon.png';
import profile_icon from '../../../assets/icons/profile_icon.png';
import sell_button from '../../../assets/icons/sell_button.png';
import { Link, useNavigate } from 'react-router-dom';


const ThirdSection = () => {

  const { isLoggedIn, logInPopUp, setLogInPopUp } = useAuth();
  const { setIsLoggedIn, setSellFormPopUp } = useAuth()
  const [profileMenu, setProfileMenu] = useState(false);
  const navgate = useNavigate();

  const changeState = () => {
    setProfileMenu(false);
    setIsLoggedIn(false);
    logOut();
  }

  return (
    <div className={!isLoggedIn ? navBarStyles.thirdContainerLoggedIn : navBarStyles.thirdContainer}>

      {/* Language selection */}
      <div className={navBarStyles.language}>
        <p className=' mt-1 font-semibold text-sm'>ENGLISH</p>
        <img className={navBarStyles.angleIcon} src={angle_icon} alt="" />
      </div>

      {/* Button for get favorite items */}
      <Link to={`/favorite`}>
        <img className={navBarStyles.favIcon} src={favorite_icon} alt="" />
      </Link>
      {/* Login button */}
      <p onClick={() => setLogInPopUp(!logInPopUp)} className={isLoggedIn ? 'hidden' : navBarStyles.logInText}>Login</p>

      {/* Chat button */}
      <img className={isLoggedIn ? navBarStyles.chatIcon : 'hidden'} src={chat_icon} alt="" />

      {/* Other notification button */}
      <img className={isLoggedIn ? navBarStyles.bellIcon : 'hidden'} src={bell_icon} alt="" />

      {/* Get profile button */}
      <div onClick={() => setProfileMenu(!profileMenu)} className='flex justify-between gap-1'>
        <img className={isLoggedIn ? navBarStyles.profileIcon : 'hidden'} src={profile_icon} alt="" />
        <img className={isLoggedIn ? navBarStyles.profileIconAngle : 'hidden'} src={angle_icon} alt="" />
        <div className={`${profileMenu ? `` : `hidden`} absolute top-[100%] h-20 w-30 bg-white shadow-md rounded-sm pt-2 flex flex-col`}>
          <button onClick={() => {setProfileMenu(false);  navgate('/myads')}} className='cursor-pointer hover:text-gray-600'>My ads</button>
          <button onClick={changeState} className='underline underline-offset-3 cursor-pointer hover:text-gray-600'>logout</button>
        </div>
      </div>

      {/* Sell button */}
      <button onClick={() => setSellFormPopUp(true)}><img className={navBarStyles.sellButton} src={sell_button} alt="" /></button>
    </div>
  )
}

export default ThirdSection
