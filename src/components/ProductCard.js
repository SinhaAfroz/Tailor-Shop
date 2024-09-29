// // src/components/ProductList.js
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';
// import CustomizationForm from './CustomizationForm';

// const ProductList = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const productsCollection = collection(db, 'products');
//             const productSnapshot = await getDocs(productsCollection);
//             const productList = productSnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setProducts(productList);
//         };

//         fetchProducts();
//     }, []);

//     return (
//         <div className="product-list">
//             {products.map(product => (
//                 <ProductCard key={product.id} product={product} />
//             ))}
//         </div>
//     );
// };

// const ProductCard = ({ product }) => {
//     return (
//         <div className="product-card">
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <CustomizationForm product={product} />
//         </div>
//     );
// };

// export default ProductList;
// src/components/ProductCard.js
import React from 'react';
import CustomizationForm from './CustomizationForm'; // Import the customization form

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image_url} alt={product.name} style={{ width: '150px', height: '150px' }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: TK {product.price}</p>

            {/* Render the CustomizationForm */}
            <CustomizationForm product={product} />
        </div>
    );
};

export default ProductCard;
