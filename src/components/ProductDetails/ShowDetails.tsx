import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Product } from "../../hooks/useAuth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const ShowDetails = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [createdAt, setCreatedAt] = useState("");

  // fetch product data
  useEffect(() => {
    const fetchItemData = async () => {
      if (!id) return;
      const productRef = doc(db, "products", id);
      const snapshot = await getDoc(productRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as Product;

        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setCondition(data.condition);

        // Ensure max 4 images
        const images = data.images.concat([null, null, null, null]).slice(0, 4);
        setImagePreviews(images);

        // set default main image to first available
        setCurrentImageIndex(0);

        // convert timestamp to readable date
        if (data.createdAt?.toDate) {
          setCreatedAt(data.createdAt.toDate().toLocaleDateString());
        }
      }
    };

    fetchItemData();
  }, [id]);

  // Handle arrow navigation
  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : imagePreviews.length - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev < imagePreviews.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="relative px-40 ">
      <div className="relative h-[800px] pt-7 flex justify-between">
        {/* LEFT SIDE */}
        <div className="relative w-[60%]">
          {/* Main Image with arrows */}
          <div className="relative w-full h-[60%] border-1 rounded-sm flex items-center justify-center">
            {imagePreviews[currentImageIndex] !== null ? (
              <img
                className="w-full h-full object-contain"
                src={imagePreviews[currentImageIndex] as string}
                alt="main"
              />
            ) : (
              <p>No Image</p>
            )}

            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full px-3 py-1"
            >
              ◀
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full px-3 py-1"
            >
              ▶
            </button>
          </div>

          {/* Preview Thumbnails */}
          <div className="relative w-full mt-2 p-3 border-1 rounded-sm bg-white h-25 flex gap-2">
            {imagePreviews.map((value, index) =>
              value !== null ? (
                <img
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-20 w-25 cursor-pointer border ${
                    currentImageIndex === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  src={value}
                  alt="preview"
                />
              ) : null
            )}
          </div>

          {/* Details */}
          <div className="relative pl-4 w-full mt-2 border-1 rounded-sm bg-white h-50">
            <p className="font-bold text-2xl">Details</p>
            <div className="border-1 mx-10 my-5"></div>
            <p className="font-bold text-xl">Description</p>
            <p>{description}</p>
            <p className="font-bold text-xl">Condition</p>
            <p>{condition}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-[38%] ">
          <div className="relative w-full h-auto p-4 bg-white border-1 rounded-sm">
            <p className="font-bold text-4xl">₹ {price}</p>
            <p className="font-bold text-2xl"> {title}</p>
            <p className="text-sm text-gray-500">Added: {createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
