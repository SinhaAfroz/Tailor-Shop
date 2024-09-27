// RegistrationPage.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered:', userCredential.user);
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>Registration Successful!</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        marginTop: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    input: {
        padding: '8px',
        fontSize: '1em',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '380px',
    },
    button: {
        padding: '10px',
        fontSize: '1em',
        backgroundColor: '#60BFC1',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px'
    },
    error: {
        color: 'red',
        fontWeight: 'bold'
    },
    success: {
        color: 'green',
        fontWeight: 'bold'
    }
};

export default RegistrationPage;
