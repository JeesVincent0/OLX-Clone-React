import Category from "../components/Category/Category"
import Footer from "../components/Footer/Footer"
import ListItems from "../components/ListItems/ListItems"
import LogIn from "../components/LogIn/LogIn"
import NavBar from "../components/Navbar/NavBar"
import SellProduct from "../components/SellProduct/SellProduct"

const Home = () => {
  return (
    <div >
      <NavBar />
      <Category />
      <ListItems />
      <Footer />
      <LogIn />
      <SellProduct />
    </div>
  )
}

export default Home
