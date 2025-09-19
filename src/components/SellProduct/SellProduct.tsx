import { useAuth } from "../../hooks/useAuth";
import close_icon from '../../assets/icons/close_icon.png';
import { Upload } from "lucide-react";
import { useState, type ChangeEvent } from "react";


import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const storage = getStorage();
const db = getFirestore();




const SellProduct = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [condition, setCondition] = useState("");

    const { setProducts, fetchProducts, isLoggedIn, sellFormPopUp, setSellFormPopUp, setLogInPopUp, user } = useAuth();
    const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null, null]);
    const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);


    const closePopUp = () => {
        setSellFormPopUp(false);
        setImagePreviews([null, null, null, null])
    }

    const uploadImagesAndSaveProduct = async (
        files: (File | null)[],
        productData: any,
        userId: string
    ) => {
        const uploadedUrls: string[] = [];

        for (let i = 0; i < files.length; i++) {
            if (files[i]) {
                const storageRef = ref(storage, `products/${userId}/${Date.now()}_${files[i]!.name}`);
                await uploadBytes(storageRef, files[i]!);
                const downloadURL = await getDownloadURL(storageRef);
                uploadedUrls.push(downloadURL);
            }
        }

        // Save product to Firestore
        await addDoc(collection(db, "products"), {
            ...productData,
            userId,
            images: uploadedUrls,
            createdAt: new Date(),
        });
    };

    const checkForm = () => {
        if(!title && !description && !price && !condition ) return false;
    }


    const handleSubmit = async () => {
        if (!user) return alert("You must be logged in to post a product!");
        if(!checkForm) return alert("Enter details");

        const productData = {
            title,
            price,
            description,
            condition,
        };

        try {
            await uploadImagesAndSaveProduct(imageFiles, productData, user.uid);
            alert("Product posted successfully!");
            closePopUp();
            setProducts([]);
            fetchProducts();

        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    // Handle file input
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


    const ImageUploadField: React.FC<{ index: number }> = ({ index }) => (
        <div className="relative flex-1">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {!imagePreviews[index] ? (
                <div className="w-full h-24 border-2 border-dashed border-gray-400 rounded-lg flex flex-col justify-center items-center hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                    <Upload className="h-6 w-6 text-gray-400 mb-1" />
                    <p className="text-gray-600 text-sm font-medium">Add Image</p>
                </div>
            ) : (
                <div className="w-full h-24 border-2 border-solid border-gray-400 rounded-lg overflow-hidden hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                    <img
                        src={imagePreviews[index]}
                        alt="Selected"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </div>
    );

    if (sellFormPopUp && isLoggedIn) {
        return (
            <>
                <div className="top-0 z-52 fixed h-screen w-screen bg-black/70 flex justify-center items-center">
                    <div className="relative h-[87vh] w-[26vw] bg-white rounded-sm">
                        <img onClick={closePopUp} className='z-10 absolute top-3 right-3 w-9 cursor-pointer' src={close_icon} alt="" />
                        <p className="font-bold text-2xl relative mt-5 ml-3">POST YOUR ADD</p>
                        <div className="absolute top- h-[96%] w-full">
                            <form className="px-4  flex flex-col gap-1.5 pt-6" action="">
                                <input onChange={(e) => setTitle(e.target.value)} className='h-10 w-full border-1 rounded-sm border-gray-400 px-3 focus:border-3 focus:outline-none focus:border-blue-800' type="text" placeholder="Title" />
                                <input onChange={(e) => setDescription(e.target.value)} className='h-30 w-full border-1 rounded-sm border-gray-400 px-3 focus:border-3 focus:outline-none focus:border-blue-800' type="text" placeholder="Description" />
                                <input onChange={(e) => setPrice(Number(e.target.value))} className='h-10 w-full border-1 rounded-sm border-gray-400 px-3 focus:border-3 focus:outline-none focus:border-blue-800' type="number" placeholder="Price" />
                                <input onChange={(e) => setCondition(e.target.value)} className='h-10 w-full border-1 rounded-sm border-gray-400 px-3 focus:border-3 focus:outline-none focus:border-blue-800' type="text" placeholder="Condition" />
                                {/* First row of image inputs */}
                                <div className="flex gap-3">
                                    <ImageUploadField index={0} />
                                    <ImageUploadField index={1} />
                                </div>

                                {/* Second row of image inputs */}
                                <div className="flex gap-3">
                                    <ImageUploadField index={2} />
                                    <ImageUploadField index={3} />
                                </div>
                                <button onClick={handleSubmit} className='h-13 text-center text-white hover:text-blue-900 font-bold bg-blue-900 hover:border-4 hover:border-blue-900 hover:bg-white rounded-sm' type="button">POST</button>
                            </form>
                        </div>
                    </div>
                </div >
            </>
        )
    } else if (sellFormPopUp && !isLoggedIn) {
        setLogInPopUp(true);
        setSellFormPopUp(false)
    }
}

export default SellProduct
