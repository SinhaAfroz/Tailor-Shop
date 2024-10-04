// src/components/ProductCard.js
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore'; // Import addDoc and collection
import CustomizationForm from './CustomizationForm';
import { auth, db } from '../firebase'; // Adjust the import path as necessary

const ProductCard = ({ product }) => {
    const [customOptions, setCustomOptions] = useState({
        size: '',
        color: '',
        fabric: ''
    });

    // Function to handle adding to cart
    const handleAddToCart = async () => {
        if (!customOptions.size || !customOptions.color || !customOptions.fabric) {
            alert('Please select all customization options');
            return;
        }

        const cartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            customization: customOptions,
            status: 'pending',
            createdAt: new Date(),
            userId: auth.currentUser.uid,
        };

        try {
            const cartItemsRef = collection(db, 'cartItems'); // Reference for the cartItems collection
            await addDoc(cartItemsRef, cartItem); // Use addDoc to add the new document
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart: ', error);
            alert('Failed to add product to cart. Please try again.');
        }
    };

    const handleCustomize = (options) => {
        setCustomOptions(options); // Update customization options state
    };

    return (
        <div className="product-card">
            <img src={product.image_url} alt={product.name} style={{ width: '150px', height: '150px' }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: TK {product.price}</p>

            {/* Render the CustomizationForm with onCustomize prop */}
            <CustomizationForm product={product} onCustomize={handleCustomize} />

            {/* Add to Cart Button */}
            <button style={styles.button} onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

const styles = {
    button: {
        padding: '0.5rem',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#B2C9E5',
        color: 'black',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '0.5rem',
    },
};

export default ProductCard;
