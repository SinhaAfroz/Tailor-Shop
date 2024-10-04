import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/products'); // Redirect if user is already logged in
            }
        });
        return () => unsubscribe(); // Clean up the listener
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', auth.currentUser);
            setEmail('');
            setPassword('');
            setError('');
            alert("Login successful!");
            navigate('/products');
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Invalid email format');
                    break;
                case 'auth/user-not-found':
                    setError('No user found with this email');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password');
                    break;
                default:
                    setError('Login failed. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordReset = async () => {
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                alert('Password reset email sent');
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('Please enter your email to reset password');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p onClick={handlePasswordReset} style={{ cursor: 'pointer', color: '#007bff' }}>
                Forgot Password?
            </p>
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
        gap: '10px'
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
        backgroundColor: '#B2C9E5',
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        fontWeight: 'bold'
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

export default Login;

