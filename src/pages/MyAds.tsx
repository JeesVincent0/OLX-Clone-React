import Category from "../components/Category/Category"
import Footer from "../components/Footer/Footer"
import NavBar from "../components/Navbar/NavBar"
import SellProduct from "../components/SellProduct/SellProduct"
import LogIn from "../components/LogIn/LogIn"
import MyAdsList from "../components/MyAds/MyAdsList"
import EditForm from "../components/EditProduct/EditForm"

const MyAds = () => {
    return (
        <div>
            <NavBar />
            <Category />
            <MyAdsList />
            <Footer />
            <LogIn />
            <SellProduct />
            <EditForm />
        </div>
    )
}

export default MyAds
