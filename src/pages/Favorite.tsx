import Category from "../components/Category/Category"
import Footer from "../components/Footer/Footer"
import NavBar from "../components/Navbar/NavBar"
import SellProduct from "../components/SellProduct/SellProduct"
import FavList from "../components/FavoritList/FavList"
import LogIn from "../components/LogIn/LogIn"

const Favorite = () => {
  return (
    <div>
      <NavBar />
      <Category />
      <FavList />
      <Footer />
      <LogIn />
      <SellProduct />
    </div>
  )
}

export default Favorite
