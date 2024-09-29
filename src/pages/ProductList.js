import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore instance

const ProductList = () => {
    const [products, setProducts] = useState([]); // useState is used here

    useEffect(() => { // useEffect is used here
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'product'));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,  // Firestore automatically generates document ID
                    ...doc.data(), // Product data including name, description, price, image_url
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div style={styles.productList}>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

const styles = {
    productList: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: '20px',
    },
};

export default ProductList;
