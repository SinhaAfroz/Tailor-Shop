import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Make sure you have your firebase config
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: null, // To store the uploaded image file
    });
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setProduct({
            ...product,
            image: e.target.files[0], // Store the image file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.description || !product.price || !product.image) {
            alert('Please fill in all fields and upload an image.');
            return;
        }

        setIsUploading(true);

        try {
            // Upload image to Firebase Storage
            const storageRef = ref(storage, `products/${product.image.name}`);
            const snapshot = await uploadBytes(storageRef, product.image);

            // Get image URL
            const downloadUrl = await getDownloadURL(snapshot.ref);
            setImageUrl(downloadUrl);

            // Add product to Firestore with image URL
            await addDoc(collection(db, 'product'), {
                name: product.name,
                description: product.description,
                price: parseFloat(product.price), // Make sure price is a number
                image_url: downloadUrl,
            });

            alert('Product added successfully!');
            setProduct({
                name: '',
                description: '',
                price: '',
                image: null,
            });
            setIsUploading(false);
        } catch (error) {
            console.error('Error adding product:', error);
            setIsUploading(false);
        }
    };

    return (
        <div className="add-product">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Product Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                </div>
                <button type="submit" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Add Product'}
                </button>
            </form>
            {imageUrl && (
                <div>
                    <h4>Uploaded Image:</h4>
                    <img src={imageUrl} alt="Uploaded product" style={{ width: '150px' }} />
                </div>
            )}
        </div>
    );
};

export default AddProduct;
