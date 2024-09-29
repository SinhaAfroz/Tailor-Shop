// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './Navbar.css';

const Navbar = () => {
    const { currentUser } = useAuth();
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out");
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Tailor Shop</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                {!currentUser ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/registration">Register</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/add">Add</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>

                )}
            </ul>
        </nav>
    );
};

export default Navbar;