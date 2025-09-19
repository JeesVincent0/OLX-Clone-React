import favorit_icon from "../../../assets/icons/favorite_icon.png";
import back_favorit from "../../../assets/icons/favorite_black.png";
import { useAuth } from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const FavCards = () => {

    const { products, addToFavorites, removeFromFavorites, user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="relative mt-1">
            <div className="grid grid-cols-4 gap-4">
                {products.map((p) => (
                    
                        <div onClick={() => navigate(`/product-details/${p.id}`)} key={p.id} className="relative h-65 cursor-pointer border border-gray-500 rounded-sm" >
                            <div className="h-[60%] bg-amber-200 m-2 relative">
                                <img src={p.images?.[0]} alt={p.title} className="h-full w-full object-cover rounded-sm" />
                                {
                                    p.favorites?.includes(user?.uid || "") ?
                                        (<div onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromFavorites(user?.uid, p.id);
                                        }} className="absolute h-8 w-8 bg-white right-3 top-3 rounded-4xl z-5 flex items-center justify-center">

                                            <img className="w-5" src={back_favorit} alt="favorite" />
                                        </div>) : (
                                            <div onClick={(e) => {
                                                e.stopPropagation();
                                                addToFavorites(user?.uid, p.id);
                                            }} className="absolute h-8 w-8 bg-white right-3 top-3 rounded-4xl z-5 flex items-center justify-center">

                                                <img className="w-5" src={favorit_icon} alt="favorite" />
                                            </div>
                                        )
                                }

                            </div>
                            <div className="m-2">
                                <p className="font-bold text-2xl">₹ {p.price}</p>
                                <p className="truncate">{p.title}</p>
                                <p className="text-xs text-gray-600">
                                    {p.createdAt?.toDate().toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                ))}
            </div>

        </div>
    );
};

export default FavCards;
