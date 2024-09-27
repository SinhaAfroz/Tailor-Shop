import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const Home = () => {
    return (
        <div className="home-page">
            <header className="header">
                <h1>Tailor Shop</h1>
                <nav>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/registration">Registration</Link></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <section className="hero">
                <h2>Welcome to Our Tailor Shop</h2>
                <p>Custom tailoring services to fit your style and needs.</p>
            </section>
            <section className="services" id="services">
                <h2>Our Services</h2>
                <ul>
                    <li>Alterations</li>
                    <li>Wedding Attire</li>
                    <li>Casual Wear</li>
                    <li>Custom Suits</li>
                </ul>
            </section>
        </div>
    );
};

export default Home;
