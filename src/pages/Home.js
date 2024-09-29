import React from 'react';
import './HomePage.css';

const Home = () => {
    return (
        <div className="home-page">
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
            <section className="cta">
                <h2>Ready to get started?</h2>
                <p>Contact us today for a consultation!</p>
                <button className="cta-button">Get in Touch</button>
            </section>
        </div>
    );
};

export default Home;
