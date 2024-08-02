import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from '../firebase';
import StorageButton from "./StorageButton";
import ColorSelection from "./ColorSelection";
import BuyNowButton from "./BuyNowButton";

function ProductImageInfo() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const storage = getStorage();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    let imageUrl = data.productImage;
                    if (imageUrl.startsWith('gs://')) {
                        const gsReference = ref(storage, imageUrl);
                        imageUrl = await getDownloadURL(gsReference);
                    }
                    setProduct({
                        id: docSnap.id,
                        productName: data.productName,
                        image: imageUrl,
                        description: data.productDescription,
                        price: data.productPrice,
                        colors: data.colors || ['#5F778A', '#B8B3A8', '#878684'],
                        storageOptions: data.storageOptions || [64, 128, 256]
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching product: ", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg my-8">
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
                        <div
                            className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[527px] aspect-[4/5]">
                            <img
                                src={product.image}
                                alt={product.productName}
                                className="absolute inset-0 w-full h-full object-contain"
                            />
                        </div>
                    </div>


                    <div className="flex flex-col justify-center w-full lg:w-1/2">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center lg:text-left">{product.productName}</h1>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 text-center lg:text-left">${product.price}</p>

                        <div className="mb-6">
                            <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-center lg:text-left">Select
                                Storage</p>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                {product.storageOptions.map((storage) => (
                                    <StorageButton
                                        key={storage}
                                        storageAmount={storage}
                                        isSelected={selectedStorage === storage}
                                        onClick={() => setSelectedStorage(storage)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-center lg:text-left">Select
                                Color</p>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                {product.colors.map((color, index) => (
                                    <ColorSelection
                                        key={index}
                                        color={color}
                                        isSelected={selectedColor === color}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <BuyNowButton backgroundColor="#4A90E2" textColor="white" content="Buy Now"/>
                            <BuyNowButton backgroundColor="white" textColor="#4A90E2" borderColor="#4A90E2"
                                          content="Add to Cart"/>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="w-full max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Product Description</h2>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductImageInfo;