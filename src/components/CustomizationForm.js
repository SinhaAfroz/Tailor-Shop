// src/components/CustomizationForm.js
import React, { useState } from 'react';

const CustomizationForm = ({ product }) => {
    const [customOptions, setCustomOptions] = useState({
        size: '',
        color: '',
        fabric: ''
    });

    const handleChange = (e) => {
        setCustomOptions({ ...customOptions, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Customized Order:', { product, customOptions });
        // Here you can handle order submission (e.g., updating cart, etc.)
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label}>
                Size:
                <select style={styles.select} name="size" onChange={handleChange} required>
                    <option value="">Select Size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                </select>
            </label>
            <label style={styles.label}>
                Color:
                <select style={styles.select} name="color" onChange={handleChange} required>
                    <option value="">Select Color</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>
            </label>
            <label style={styles.label}>
                Fabric:
                <select style={styles.select} name="fabric" onChange={handleChange} required>
                    <option value="">Select Fabric</option>
                    <option value="cotton">Cotton</option>
                    <option value="silk">Silk</option>
                    <option value="polyester">Polyester</option>
                </select>
            </label>
            <button style={styles.button} type="submit">Add to Cart</button>
        </form>
    );
};

const styles = {
    /* src/components/CustomizationForm.css */
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        border: ' 1px solid #ccc',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
    },

    label: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
        color: '#333',
    },
    select: {
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
        marginTop: '0.5rem',
    },

    button: {
        padding: '0.75rem',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#B2C9E5',
        color: 'black',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },

    // buttonHover: {
    //     backgroundColor: '#0056b3',
    // }

};

export default CustomizationForm;
