import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!auth.currentUser) {
                    setError('You must be logged in to view products.');
                    setLoading(false);
                    return;
                }

                const querySnapshot = await getDocs(collection(db, 'product'));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setError('Failed to fetch products. Please try again later.'); // Update error state
            } finally {
                setLoading(false); // Ensure loading state is reset
            }
        };

        fetchProducts();
    }, []);

    return (
        <div style={styles.productList}>
            {loading && <p>Loading products...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && products.map(product => (
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