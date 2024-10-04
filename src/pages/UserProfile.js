import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Make sure to adjust the import path
import { doc, getDoc } from 'firebase/firestore';

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDoc, setUserDoc] = useState(null); // State for user document data
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user); // User is signed in
                try {
                    const userDocRef = doc(db, 'users', user.uid); // Replace 'users' with your actual collection name
                    const docSnapshot = await getDoc(userDocRef);

                    if (docSnapshot.exists()) {
                        setUserDoc(docSnapshot.data()); // Set user document data
                    } else {
                        setError('No user document found.');
                    }
                } catch (err) {
                    setError('Error fetching user document: ' + err.message);
                }
            } else {
                setCurrentUser(null); // No user is signed in
            }
            setLoading(false); // Set loading to false after fetching data
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div style={styles.userProfile}>
            {loading && <p style={styles.loading}>Loading profile...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {currentUser && userDoc ? (
                <div>
                    <h2 style={styles.userProfileH2}>User Profile</h2>
                    <p style={styles.userProfileP}><span style={styles.userProfilePSpan}>Email:</span> {currentUser.email}</p>
                    <p style={styles.userProfileP}><span style={styles.userProfilePSpan}>User ID:</span> {currentUser.uid}</p>
                    <p style={styles.userProfileP}><span style={styles.userProfilePSpan}>First Name:</span> {userDoc.firstName}</p> {/* Adjust field names based on your document structure */}
                    <p style={styles.userProfileP}><span style={styles.userProfilePSpan}>Last Name:</span> {userDoc.lastName}</p>
                    <p style={styles.userProfileP}><span style={styles.userProfilePSpan}>Phone:</span> {userDoc.phone}</p>
                    <p style={styles.userProfileP}><span style={styles.userProfilePSpan}>Address:</span> {userDoc.address}</p>
                    <p style={styles.userProfileP}><span style={styles.userProfilePSpan}>City:</span> {userDoc.city}</p>
                    <p style={styles.userProfileP}><span style={styles.userProfilePSpan}>District:</span> {userDoc.district}</p>
                    <p style={styles.userProfileP}><span style={styles.userProfilePSpan}>Postal:</span> {userDoc.postal}</p>
                </div>
            ) : (
                <h2 style={styles.userProfileH2}>No user is signed in.</h2>
            )}
        </div>
    );
};


const styles = {
    userProfile: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#FFF5CD',
        marginTop: '20px'
    },
    userProfileH2: {
        textAlign: 'center',
        color: '#333',
    },
    userProfileP: {
        fontSize: '16px',
        color: '#555',
        lineHeight: '1.5',
    },
    userProfilePSpan: {
        fontWeight: 'bold',
        color: '#000',
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

export default UserProfile;