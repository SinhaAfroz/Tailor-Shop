import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Adjust the import path as necessary


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            if (!auth.currentUser) {
                setError('You must be logged in to view your orders.');
                setLoading(false);
                return;
            }

            const userId = auth.currentUser.uid;
            const ordersCollection = collection(db, 'cartItems');
            const q = query(ordersCollection, where('userId', '==', userId)); // Query to get user's orders

            try {
                const querySnapshot = await getDocs(q);
                const ordersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(ordersList);
            } catch (err) {
                setError('Error fetching orders: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p style={styles.loading}>Loading orders...</p>;
    }

    if (error) {
        return <p style={styles.error}>{error}</p>;
    }

    return (
        <div style={styles.orders}>
            <h2 style={styles.ordersH2}>Your Orders</h2>
            {orders.length === 0 ? (
                <p style={styles.ordersP}>No orders found.</p>
            ) : (
                <ul style={styles.ordersList}>
                    {orders.map(order => (
                        <li key={order.id} style={styles.ordersListItem}>
                            <h3>{order.name}</h3>
                            <p style={styles.ordersP}>Price: TK {order.price}</p>
                            <p style={styles.ordersP}>Status: {order.status}</p>
                            <p style={styles.ordersP}>Customization: Size: {order.customization.size}, Color: {order.customization.color}, Fabric: {order.customization.fabric}</p>
                            <p style={styles.ordersP}>Ordered on: {order.createdAt.toDate().toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    orders: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#FFF5CD',
        marginTop: '20px'
    },
    ordersH2: {
        textAlign: 'center',
        color: '#333',
    },
    ordersP: {
        fontSize: '16px',
        color: '#555',
        lineHeight: '1.5',
    },
    ordersList: {
        listStyleType: 'none',
        padding: 0,
        paddingLeft: '10px'
    },
    ordersListItem: {
        borderBottom: '1px solid #ddd',
        padding: '10px 0',
    },
    loading: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#ff0000',
    },
    error: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#ff0000',
    },
};

export default Orders;