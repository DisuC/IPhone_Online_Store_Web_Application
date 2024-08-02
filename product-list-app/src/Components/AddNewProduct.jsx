import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import Swal from 'sweetalert2';

function AddNewProduct() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Upload image to Firebase Storage
            const storage = getStorage();
            const imageRef = ref(storage, `${Date.now()}_${productImage.name}`);
            await uploadBytes(imageRef, productImage);
            const imageUrl = await getDownloadURL(imageRef);

            // Add product data to Firestore
            const productData = {
                productName,
                productPrice,
                productImage: imageUrl,
                productDescription,
            };

            const docRef = await addDoc(collection(db, "products"), productData);
            console.log("Product added with ID: ", docRef.id);

            // Reset form
            setProductName('');
            setProductPrice('');
            setProductImage(null);
            setProductDescription('');

            // Show success message with SweetAlert2
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Product added successfully!',
                confirmButtonColor: '#4F46E5', 
            });
        } catch (error) {
            console.error("Error adding product: ", error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error adding product. Please try again.',
                confirmButtonColor: '#4F46E5',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="AddNewProduct-Container max-w-md mx-auto mt-10 p-4 sm:p-6 bg-white rounded-lg md:border-2 md:border-gray-300">
            <div className="AddNewProduct-Title mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-center">Add New Product</h2>
            </div>
            <div className="AddProductForm-Container">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="field-container">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 text-sm"
                            required
                        />
                    </div>
                    <div className="field-container">
                        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">Product Price:</label>
                        <input
                            type="number"
                            id="productPrice"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 text-sm"
                            required
                        />
                    </div>
                    <div className="field-container">
                        <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">Product Image:</label>
                        <input
                            type="file"
                            id="productImage"
                            onChange={(e) => setProductImage(e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="field-container">
                        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">Product Description:</label>
                        <textarea
                            id="productDescription"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            rows="3"
                            className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 text-sm"
                            required
                        ></textarea>
                    </div>
                    <div className="field-container">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewProduct;
