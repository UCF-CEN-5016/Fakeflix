/*
* This file contains actions that cover different user authentication states, including the user's session,
* sign in with email, with Google, and anonymously, sign out, and sign up. The actions defined in this file
* are used by different components in the application, as well as the auth.sagas.js file.
*/

import { authActionTypes } from "./auth.types"


/*
* Action that sets the type to check the user's session.
* Dispacted in the App component whenever the value of dispatch is changed.
*/
export const checkUserSession = () => ({
    type: authActionTypes.CHECK_USER_SESSION
})

/*
* Action that the user is tryng to sign in using their email and password.
* The user's email and password are put in the payload.
* Dispacted by SignIn component when user clicks the "Sign in" button after entering their email and password.
*/
export const emailSignInStart = emailAndPassword => ({
    type: authActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

/*
* Action that indicates the user is trying to sign in using Google.
* Dispacted in the sign in component when user clicks the "Sign in with Google" button.
*/
export const googleSignInStart = () => ({
    type: authActionTypes.GOOGLE_SIGN_IN_START
})

/*
* Action that inidcates the user is trying to sign in anonymously.
* Dispacted in the sign in component when user clicks the "Sign in anonymously" button.
*/
export const anonymousSignInStart = () => ({
    type: authActionTypes.ANONYMOUS_SIGN_IN_START
})

/*
* Action that indicates the user was able to sign in.
* Puts the user id and snapshot in the payload as a user object.
* Used in the auth.sagas.js file after a user snapshot was created.
*/
export const signInSuccess = user => ({
    type: authActionTypes.SIGN_IN_SUCCESS,
    payload: user
})


/*
* Action that indicates there was an issue signing the user in.
* Puts the error message in the payload.
* Used multiple times in the auth.sagas.js file when there was an error getting the user snapshot.
*/
export const signInFailure = error => ({
    type: authActionTypes.SIGN_IN_FAILURE,
    payload: error
})

/*
* Action that indicates the user is trying to sign out.
* Dispacthed from the Navbar component when the user clicks the "Sign Out" button.
*/
export const signOutStart = () => ({
    type: authActionTypes.SIGN_OUT_START
})

/*
* Action that indicates the signout was successful.
* Called in auth.sagas.js file after signing out from firebase.
*/
export const signOutSuccess = () => ({
    type: authActionTypes.SIGN_OUT_SUCCESS
})

/*
* Action that indicates the signout failed.
* The error message is put in the payload.
* Called in auth.sagas.js file if there was an error signing out from firebase.
*/
export const signOutFailure = error => ({
    type: authActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

/*
* Action that indiciates the user is submiting sign up information.
* The user's display name, email, and password are put in the payload.
* Dispacted by SignUp component when user clicks the "Sign Up" button.
*/
export const signUpStart = userCredentials => ({
    type: authActionTypes.SIGN_UP_START,
    payload: userCredentials
})

/* 
* Action that indicates the signup was sucessful.
* Puts the user sent from firebase and the user's display name in the payload.
* Called in the auth.sagas.js file after the user was created in firebase.
*/
export const signUpSuccess = ({ user, additionalData }) => ({
    type: authActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

/*
* Action that indicates there was an error signing up.
* Puts the error message in the payload.
* Called in the auth.sagas.js file if there was an error in firebase creating the user.
*/
export const signUpFailure = error => ({
    type: authActionTypes.SIGN_UP_FAILURE,
    payload: error
})