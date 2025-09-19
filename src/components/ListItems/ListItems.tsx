import { useAuth } from "../../hooks/useAuth"
import Cards from "./SubComponents/Cards"

const ListItems = () => {


  const { fetchMore } = useAuth();
  return (
    <div className="relative px-40 pt-6">
      <div className=" h-20">
        <p className="font-medium text-3xl">Fresh recommendations</p>
      </div>
      <Cards />
      <div className="h-12 flex justify-center mt-20">
        <button onClick={fetchMore} className="h-12 w-25 bg-white border-2 border-blue-900 font-bold text-blue-900 hover:border-4 rounded-sm cursor-pointer">Load more</button>
      </div>
    </div>
  )
}

export default ListItems
