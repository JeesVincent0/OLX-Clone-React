import { FooterStyle } from "./FooterStyle";
import facebook_icon from '../../assets/icons/facebook_icon.png';
import instagram_icon from '../../assets/icons/instagram_icon.png';
import youtube_icon from '../../assets/icons/youtube_icon.png';
import x_icon from '../../assets/icons/X_icon.png';
import whatsapp_icon from '../../assets/icons/Whatsapp_icon.png';
import linkedin_icon from '../../assets/icons/linkedIn_icon.png';

const Footer = () => {

  const popularLocations = ["Kolkata", "Mumbai", "Mumbai", "Pune"];
  const trendingLoations = ["Bhubaneshwar", "Hyderabad", "Chandigrah", "Nashik"];
  const aboutUs = ["Tech@OLX", "Careers"];
  const OLX = ["Blog", "Help", "Sitemap", "Legal & privacy information", "Vulnarability disclosure Program",];
  const icons = [facebook_icon, instagram_icon, youtube_icon, x_icon, whatsapp_icon, linkedin_icon];


  return (
    <div className="h-46 bg-gray-200 mt-10 grid grid-cols-5 gap-1 px-40 p-5">

      <div className="flex flex-col">
        <p className="font-bold mb-2">POPULAR LOCATIONS</p>
        {popularLocations.map((location) => (<p className={FooterStyle.textLink}>{location}</p>))}
      </div>

      <div className="flex flex-col">
        <p className="font-bold mb-2">TRENDING LOCATIONS</p>
        {trendingLoations.map((location) => (<p className={FooterStyle.textLink}>{location}</p>))}
      </div>

      <div className="flex flex-col">
        <p className="font-bold mb-2">About Us</p>
        {aboutUs.map((location) => (<p className={FooterStyle.textLink}>{location}</p>))}
      </div>

      <div className="flex flex-col">
        <p className="font-bold mb-2">OLX</p>
        {OLX.map((location) => (<p className={FooterStyle.textLink}>{location}</p>))}
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold ">FOLLOW US</p>
        <div className="h-8 flex gap-1.5 cursor-pointer">
          {icons.map((value) => <img className="h-7 w-7" src={value} alt="" />)}
        </div>
      </div>
    </div>
  )
}

export default Footer
