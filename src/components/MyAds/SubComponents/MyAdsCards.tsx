import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const MyAdsCards = () => {

  const { setEditItemId, setEditForm, fetchProducts, setMyProducts, myProducts, fetchProductsByUser, user, setProducts } = useAuth();

  useEffect(() => {
    setMyProducts([]);
    fetchProductsByUser(user?.uid);
  }, [])

  const editItem = (productId: string) => {
    setEditForm(true)
    setEditItemId(productId);
  }

  const deletItems = async (productId: string) => {
    try {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      console.log("Product deleted successfully:", productId);
      setProducts([]);
      fetchProducts();
      setMyProducts([]);
      fetchProductsByUser(user?.uid);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }

  return (
    <div className="relative mt-1">
      <div className="grid grid-cols-4 gap-4">
        {
          myProducts.map((p) => (
            <div key={p.id} className="relative cursor-pointer border border-gray-500 rounded-sm" >
              <div className="h-[60%] bg-amber-200 m-2 relative">
                <img src={p.images?.[0]} alt={p.title} className="h-full w-full object-cover rounded-sm" />
              </div>
              <div className="m-2">
                <p className="font-bold text-2xl">₹ {p.price}</p>
                <p className="truncate">{p.title}</p>
                <p className="text-xs text-gray-600">
                  {p.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>

              <div className="relative h-20 m-2 flex justify-between gap-3">
                <button onClick={() => deletItems(p.id)} className="h-10 w-20 bg-red-700 rounded-sm hover:bg-white hover:text-red-700 hover:border-4 font-bold text-white p-2 flex justify-center items-center cursor-pointer">Delete</button>
                <button onClick={() => editItem(p.id)} className="h-10 w-20 bg-blue-700 rounded-sm hover:bg-white hover:text-blue-700 hover:border-4 font-bold text-white p-2 flex justify-center items-center cursor-pointer">Edit</button>
              </div>
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default MyAdsCards
