// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const cartCollection = collection(db, 'cartItems');
            const cartSnapshot = await getDocs(cartCollection);
            const cartList = cartSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCartItems(cartList);
        };

        fetchCartItems();
    }, []);

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.price} TK - {item.customization.size}, {item.customization.color}, {item.customization.fabric}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
