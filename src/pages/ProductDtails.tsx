import Category from "../components/Category/Category"
import Footer from "../components/Footer/Footer"
import LogIn from "../components/LogIn/LogIn"
import NavBar from "../components/Navbar/NavBar"
import ShowDetails from "../components/ProductDetails/ShowDetails"
import SellProduct from "../components/SellProduct/SellProduct"

const ProductDtails = () => {
    return (
        <div>
            <NavBar />
            <Category />
            <ShowDetails />
            <Footer />
            <LogIn />
            <SellProduct />
        </div>
    )
}

export default ProductDtails
