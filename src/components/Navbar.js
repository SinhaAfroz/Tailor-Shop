import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Correct usage of useNavigate
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './Navbar.css';

const Navbar = () => {
    const { currentUser } = useAuth(); // Access current user from context
    const auth = getAuth();
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleLogout = async () => {
        try {
            await signOut(auth);  // Sign out from Firebase
            navigate('/');  // Navigate to home
            window.location.reload();  // Reload the page
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

                {!currentUser ? (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/registration">Register</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        {/* <li><Link to="/add">Add</Link></li> */}
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;