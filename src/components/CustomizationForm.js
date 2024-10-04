// src/components/CustomizationForm.js
import React, { useState } from 'react';

const CustomizationForm = ({ product, onCustomize }) => {
    const [customOptions, setCustomOptions] = useState({
        size: '',
        color: '',
        fabric: ''
    });
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newOptions = { ...customOptions, [name]: value };
        setCustomOptions(newOptions);
        onCustomize(newOptions); // Call onCustomize every time an option changes
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <button style={styles.button} onClick={toggleCollapse}>
                {isCollapsed ? 'Show Customization Options' : 'Hide Customization Options'}
            </button>
            {!isCollapsed && (
                <form style={styles.container}>
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
                </form>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        marginTop: '0.5rem',
    },
    button: {
        padding: '0.5rem',
        border: 'none',
        borderRadius: '4px',
        color: 'black',
        fontSize: '1rem',
        cursor: 'pointer',
        backgroundColor: '#FFCFB3',
        transition: 'background-color 0.3s ease',
        marginTop: '0.5rem',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
        color: '#333',
    },
    select: {
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
    },
};

export default CustomizationForm;
