import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import MyAds from "./pages/MyAds";
import ProductDtails from "./pages/ProductDtails";
import Test from "./pages/test";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/myads" element={<MyAds />} />
        <Route path="/product-details/:id" element={<ProductDtails />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  )
}

export default App