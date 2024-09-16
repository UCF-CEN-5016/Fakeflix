/**
 * @file firebaseUtils.js
 * @description This file contains utility functions and configurations for Firebase integration in the application.
 * It handles Firebase initialization, authentication, and Firestore database operations.
 * The file exports several functions and objects that can be used throughout the application for Firebase-related tasks.
 */

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Destructure environment variables for Firebase configuration
const { 
    /**
     * @description The API key for your Firebase project. This is required for authenticating requests to Firebase services.
     * @type {string}
     */
    REACT_APP_FIREBASE_API_KEY,

    /**
     * @description The authentication domain for your Firebase project. This is used for authentication operations.
     * @type {string}
     */
    REACT_APP_FIREBASE_AUTH_DOMAIN,

    /**
     * @description The ID of your Firebase project. This is a unique identifier for your project.
     * @type {string}
     */
    REACT_APP_FIREBASE_PROJECT_ID,

    /**
     * @description The storage bucket for your Firebase project. This is used for Firebase Storage operations.
     * @type {string}
     */
    REACT_APP_FIREBASE_STORAGE_BUCKET,

    /**
     * @description The messaging sender ID for your Firebase project. This is used for Firebase Cloud Messaging.
     * @type {string}
     */
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

    /**
     * @description The application ID for your Firebase project. This is a unique identifier for your app within the project.
     * @type {string}
     */
    REACT_APP_FIREBASE_APP_ID,

    /**
     * @description The measurement ID for Google Analytics in your Firebase project. This is used for analytics operations.
     * @type {string}
     */
    REACT_APP_FIREBASE_MEASUREMEMT_ID 
} = process.env;

/**
 * Firebase Configuration Object
 * @type {Object}
 * @property {string} apiKey - The API key for Firebase project
 * @property {string} authDomain - The auth domain for Firebase project
 * @property {string} projectId - The project ID for Firebase project
 * @property {string} storageBucket - The storage bucket for Firebase project
 * @property {string} messagingSenderId - The messaging sender ID for Firebase project
 * @property {string} appId - The app ID for Firebase project
 * @property {string} measurementId - The measurement ID for Firebase project
 */
const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMEMT_ID
}

/**
 * Creates a user profile document in Firestore if it doesn't already exist
 * @param {Object} userAuth - The user authentication object from Firebase
 * @param {string} userAuth.uid - The unique identifier for the user
 * @param {string} userAuth.displayName - The display name of the user
 * @param {string} userAuth.email - The email address of the user
 * @param {string} [userAuth.photoURL] - The URL of the user's profile photo (optional)
 * @param {Object} [additionalData] - Any additional data to be stored with the user profile
 * @param {string} [additionalData.phoneNumber] - The user's phone number (optional)
 * @param {string} [additionalData.address] - The user's address (optional)
 * @param {Date} [additionalData.birthDate] - The user's birth date (optional)
 * @param {string[]} [additionalData.interests] - An array of user's interests (optional)
 * @returns {Promise<firebase.firestore.DocumentReference>} A reference to the user's document in Firestore
 * 
 * @example
 * // Basic usage with userAuth object
 * const userAuth = {
 *   uid: '123456',
 *   displayName: 'John Doe',
 *   email: 'john@example.com',
 *   photoURL: 'https://example.com/photo.jpg'
 * };
 * const userRef = await createUserProfileDocument(userAuth);
 * 
 * @example
 * // Usage with additional data
 * const userAuth = {
 *   uid: '123456',
 *   displayName: 'Jane Doe',
 *   email: 'jane@example.com'
 * };
 * const additionalData = {
 *   phoneNumber: '123-456-7890',
 *   address: '123 Main St, City, Country',
 *   birthDate: new Date(1990, 0, 1),
 *   interests: ['reading', 'traveling']
 * };
 * const userRef = await createUserProfileDocument(userAuth, additionalData);
 */
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData,
            })
        } catch (error) {
            console.log("error creating user", error.message)
        }
    }

    return userRef;
}

/**
 * Returns a promise that resolves with the current user's auth state
 * @returns {Promise<firebase.User|null>} A promise that resolves with the current user object or null if not signed in
 */
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

// Initialize Firebase app with the configuration
firebase.initializeApp(firebaseConfig)

/**
 * Firebase Authentication instance
 * @type {firebase.auth.Auth}
 */
export const auth = firebase.auth()

/**
 * Firebase Firestore instance
 * @type {firebase.firestore.Firestore}
 */
export const firestore = firebase.firestore()

/**
 * Google Auth Provider for Firebase
 * @type {firebase.auth.GoogleAuthProvider}
 */
export const googleProvider = new firebase.auth.GoogleAuthProvider()

/**
 * Configure the Google Auth Provider to always prompt users to select an account.
 * This ensures that the user always has the option to choose which Google account to use for authentication,
 * even if they're already signed in to a Google account in their browser.
 * It provides a consistent authentication experience and allows users with multiple Google accounts
 * to easily switch between them when signing in to your application.
 */
googleProvider.setCustomParameters({ prompt: "select_account" })

/**
 * Initiates Google Sign-In popup
 * @returns {Promise<firebase.auth.UserCredential>} A promise that resolves with the signed-in user's credentials
 */
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase