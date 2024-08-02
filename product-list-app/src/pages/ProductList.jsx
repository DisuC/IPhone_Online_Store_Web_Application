import React, { useState, useEffect } from 'react';
import ProductContainer from "../Components/ProductContainer";
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from '../firebase';
import AddNewProduct from "../Components/AddNewProduct";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const storage = getStorage();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const productSnapshot = await getDocs(productsCollection);
                const productList = await Promise.all(productSnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    let imageUrl = data.productImage;
                    if (imageUrl.startsWith('gs://')) {
                        const gsReference = ref(storage, imageUrl);
                        imageUrl = await getDownloadURL(gsReference);
                    }
                    return {
                        id: doc.id,
                        ProductName: data.productName,
                        Image: imageUrl,
                        Description: data.productDescription,
                        Price: data.productPrice
                    };
                }));
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const chunkArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );
    };

    const productRows = chunkArray(products, 3);

    return (
        <div className="container mx-auto px-4 relative">
            <div className="flex justify-end mb-8 mt-4">
                <button
                    onClick={toggleModal}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Product
                </button>
            </div>
            <div className="flex flex-col items-center space-y-10 mb-10 ml-10 mr-10">
                {productRows.map((row, rowIndex) => (
                    <div key={rowIndex}
                         className="flex flex-col  sm:flex-row justify-center items-center sm:items-stretch space-y-6 sm:space-y-0 sm:space-x-6 w-full">
                        {row.map((product) => (
                            <div key={product.id} className="w-full sm:w-1/3 flex justify-center">
                                <ProductContainer
                                    id={product.id}
                                    Image={product.Image}
                                    ProductName={product.ProductName}
                                    Description={product.Description}
                                    Price={product.Price}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md transform transition-all duration-300 ease-in-out scale-100 opacity-100">
                        <button
                            onClick={toggleModal}
                            className="float-right text-gray-700 hover:text-gray-900"
                        >
                            ×
                        </button>
                        <AddNewProduct />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
