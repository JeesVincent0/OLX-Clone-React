import { useAuth } from "../../hooks/useAuth";
import close_icon from "../../assets/icons/close_icon.png";
import { Upload, X } from "lucide-react";
import { useState, useEffect, type ChangeEvent } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const storage = getStorage();
const db = getFirestore();

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  images: string[];
  userId: string;
}

const EditForm = () => {
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
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const { isLoggedIn, editForm, setEditForm, user, editItemId } = useAuth();

  // fetch product data
  useEffect(() => {
    const fetchItemData = async () => {
      if (!editItemId) return;
      const productRef = doc(db, "products", editItemId);
      const snapshot = await getDoc(productRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as Product;
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setCondition(data.condition);
        setImagePreviews(data.images.concat([null, null, null, null]).slice(0, 4));
      }
    };

    if (editForm) fetchItemData();
  }, [editForm, editItemId]);

  // close popup
  const closePopUp = () => {
    setEditForm(false);
    setImagePreviews([null, null, null, null]);
    setImageFiles([null, null, null, null]);
  };

  // handle file select
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0] || null;
    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  // remove image
  const handleRemoveImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    const newFiles = [...imageFiles];
    newPreviews[index] = null;
    newFiles[index] = null;
    setImagePreviews(newPreviews);
    setImageFiles(newFiles);
  };

  // upload new images & update product
  const handleSubmit = async () => {
    if (!user || !editItemId) return alert("You must be logged in!");

    try {
      const uploadedUrls: string[] = [];

      // Upload only new files
      for (let i = 0; i < imageFiles.length; i++) {
        if (imageFiles[i]) {
          const storageRef = ref(
            storage,
            `products/${user.uid}/${Date.now()}_${imageFiles[i]!.name}`
          );
          await uploadBytes(storageRef, imageFiles[i]!);
          const downloadURL = await getDownloadURL(storageRef);
          uploadedUrls.push(downloadURL);
        } else if (imagePreviews[i]) {
          // keep old image
          uploadedUrls.push(imagePreviews[i]!);
        }
      }

      const productRef = doc(db, "products", editItemId);
      await updateDoc(productRef, {
        title,
        description,
        price,
        condition,
        images: uploadedUrls,
      });

      alert("Product updated successfully!");
      closePopUp();
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed!");
    }
  };

  // image upload field with remove option
  const ImageUploadField: React.FC<{ index: number }> = ({ index }) => (
    <div className="relative flex-1">
      {!imagePreviews[index] ? (
        <label className="w-full h-24 border-2 border-dashed border-gray-400 rounded-lg flex flex-col justify-center items-center hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
          <Upload className="h-6 w-6 text-gray-400 mb-1" />
          <p className="text-gray-600 text-sm font-medium">Add Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, index)}
            className="hidden"
          />
        </label>
      ) : (
        <div className="w-full h-24 border-2 border-solid border-gray-400 rounded-lg overflow-hidden relative">
          <img
            src={imagePreviews[index]!}
            alt="Selected"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => handleRemoveImage(index)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );

  if (editForm && isLoggedIn) {
    return (
      <div className="top-0 z-52 fixed h-screen w-screen bg-black/70 flex justify-center items-center">
        <div className="relative h-[87vh] w-[26vw] bg-white rounded-sm">
          <img
            onClick={closePopUp}
            className="z-10 absolute top-3 right-3 w-9 cursor-pointer"
            src={close_icon}
            alt=""
          />
          <p className="font-bold text-2xl relative mt-5 ml-3">EDIT YOUR ITEM</p>
          <div className="absolute top- h-[96%] w-full">
            <form className="px-4 flex flex-col gap-1.5 pt-6" onSubmit={(e) => e.preventDefault()}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 w-full border rounded-sm border-gray-400 px-3"
                type="text"
                placeholder="Title"
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-30 w-full border rounded-sm border-gray-400 px-3"
                type="text"
                placeholder="Description"
              />
              <input
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="h-10 w-full border rounded-sm border-gray-400 px-3"
                type="number"
                placeholder="Price"
              />
              <input
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="h-10 w-full border rounded-sm border-gray-400 px-3"
                type="text"
                placeholder="Condition"
              />

              <div className="flex gap-3">
                <ImageUploadField index={0} />
                <ImageUploadField index={1} />
              </div>
              <div className="flex gap-3">
                <ImageUploadField index={2} />
                <ImageUploadField index={3} />
              </div>

              <button
                onClick={handleSubmit}
                className="h-13 text-center text-white font-bold bg-blue-900 hover:border-2 hover:border-blue-900 hover:bg-white hover:text-blue-900 rounded-sm mt-4"
                type="button"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default EditForm;
